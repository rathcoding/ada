<template>
  <q-page class="container q-gutter-md q-pl-md q-pr-md q-pt-md">
    <q-card class="q-pa-lg">
      <div class="row q-pb-md">
        <div class="col-md-12 title">
          <div class="icon-search">
            <q-icon name="whatshot" size="lg" color="primary" />
          </div>
          <div class="q-pl-sm">
            <span class="job-title-section">Meus Matches</span>
            <br />
            <span class="job-subtitle-section">
              Analisamos seu currículo e achamos que estas vagas são sob medida
              para você!
            </span>
          </div>
        </div>
      </div>
    </q-card>

    <q-card class="q-pa-lg">
      <q-list class="row q-gutter-lg">
        <q-card
          elevated
          bordered
          class="my-card bg-grey-1"
          v-for="job in jobs"
          :key="job.id"
        >
          <div
            v-ripple
            @click="(modal = true), (jobSelected = job)"
            class="cursor-pointer relative-position"
          >
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="company">{{ job.companyName }}</div>
                  <div class="subtitle">
                    <div><q-icon name="person" size="es" /></div>
                    <div class="job-title">{{ job.jobTitle }}</div>
                  </div>
                </div>
                <div>
                  <div class="match-info" style="z-index: 9">
                    <div
                      class="q-ml-md round"
                      :style="{
                        opacity: job.match * 0.01,
                        backgroundColor: 'green',
                      }"
                    >
                      {{ job.match }}%
                    </div>
                  </div>
                  <div class="match-info">
                    <div class="q-ml-md round" style="background-color: grey">
                      {{ job.match }}%
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-separator class="separator" />

            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="salary">Salário</div>
                  <div class="salary-value">
                    R${{ job.salaryMin }} à R${{ job.salaryMax }}
                  </div>
                </div>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </q-list>
    </q-card>
  </q-page>

  <q-dialog v-model="modal">
    <q-card style="min-width: 750px">
      <q-card-section class="row items-center q-pb-none">
        <q-card-section class="col-md-12">
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="company">{{ jobSelected.companyName }}</div>
              <div class="subtitle">
                <div><q-icon name="person" size="es" /></div>
                <div class="job-title">{{ jobSelected.jobTitle }}</div>
              </div>
            </div>
            <div>
              <div class="match-info" style="z-index: 9">
                <div
                  class="q-ml-md round"
                  :style="{
                    opacity: jobSelected.match * 0.01,
                    backgroundColor: 'green',
                  }"
                >
                  {{ jobSelected.match }}%
                </div>
              </div>
              <div class="match-info">
                <div class="q-ml-md round" style="background-color: grey">
                  {{ jobSelected.match }}%
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <div class="close-btn">
          <q-btn icon="close" flat round dense v-close-popup />
        </div>
      </q-card-section>

      <q-separator class="separator" />

      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="salary">Salário</div>
            <div class="salary-value">
              R${{ jobSelected.salaryMin }} à R${{ jobSelected.salaryMax }}
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row items-center no-wrap" style="padding: 5px">
          <div class="modal-require">Requisitos da vaga</div>
          <div class="modal-match">Match</div>
          <div class="modal-improve">Melhore suas chances</div>
        </div>

        <div
          class="row items-center no-wrap"
          style="padding: 5px"
          v-for="(skill, index) in jobSelected.skills"
          :key="skill.id"
        >
          <div class="modal-require-value">
            <div
              class="ball"
              :style="{ backgroundColor: colors[index], zIndex: 9 }"
            ></div>
            {{ skill.skill }}
          </div>
          <div class="modal-match-value">
            <div class="progress">
              <div>
                <div
                  class="bar"
                  :style="{
                    backgroundColor: colors[index],
                    width: skill.matchSkillProfessional,
                    zIndex: 9,
                  }"
                ></div>

                <div
                  class="bar"
                  :style="{
                    backgroundColor: 'grey',
                  }"
                ></div>
              </div>
            </div>

            <div style="min-width: 34px">
              {{ skill.matchSkillProfessional }}%
            </div>
          </div>
          <div class="modal-improve-value">
            <q-btn color="primary" disable>Ver dicas</q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section
        class="btn-register"
        v-if="jobSelected.matchMin < jobSelected.match"
      >
        <q-btn @click="registerJob" color="primary">Candidatar-se</q-btn>
      </q-card-section>

      <q-card-section
        class="btn-register"
        v-if="jobSelected.matchMin > jobSelected.match"
      >
        <q-btn @click="registerJob" color="primary" disable=""
          >Candidatar-se</q-btn
        >
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { matchSkill, softMatch, match } from "../../utils/match";
import { api } from "src/boot/axios";

let optionsForFilter = {};
let jobsForRef = [];

export default {
  name: "MatchProfessional",

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const options = ref({});
    const query = ref([]);
    const jobs = ref(jobsForRef);
    const jobSelected = ref({});
    let skillProfessional = ref([]);

    onMounted(async () => {
      jobsForRef = [];
      await api
        .get("/professional/jobs")
        .then((res) => {
          skillProfessional.value = res.data.skillsPro;
          for (let job of res.data.job) {
            job["match"] = parseInt(match(job.skills, res.data.skillsPro));
            job.skills.forEach((skill, index) => {
              job.skills[index]["matchSkillProfessional"] = parseInt(
                matchSkill(skill, res.data.skillsPro)
              );
            });
            if (job.matchMin < job.match) {
              jobsForRef.push(job);
            }
          }
          if (jobsForRef.length) {
            jobsForRef.sort((a, b) => b.match - a.match);
          }
        })
        .catch((err) => {
          $q.notify({
            color: "negative",
            message: "Erro no sistema. Tente mais tarde.",
          });
        });
    });

    const filterFn = (val, update) => {
      if (val === "") {
        update(() => {
          options.value = {
            level: optionsForFilter.level,
            skill: optionsForFilter.skill,
          };
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = {
          level: optionsForFilter.level.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          ),
          skill: optionsForFilter.skill.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          ),
        };
      });
    };

    return {
      options,
      filterFn,
      query,
      jobs,
      router,
      skillProfessional,
      jobSelected,
      modal: ref(false),
      colors: ref([
        "#bc3063",
        "#34c38f",
        "#50a5f1",
        "#f1b44c",
        "#6f42c1",
        "#bc3063",
        "#34c38f",
        "#50a5f1",
        "#f1b44c",
        "#6f42c1",
        "#bc3063",
        "#34c38f",
        "#50a5f1",
        "#f1b44c",
        "#6f42c1",
      ]),
    };
  },
  methods: {
    async registerJob() {
      await api
        .post("/professional/jobs/application", {
          data: { match: this.jobSelected.match, job_id: this.jobSelected.id },
        })
        .then(() => {
          this.modal = false;
          this.$q.notify({
            color: "positive",
            message: "Cadastrada com sucesso!",
          });
        })
        .catch((err) => {
          this.$q.notify({
            color: "negative",
            message: err.response.data,
          });
        });
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.job-title-section {
  font-size: 20px;
}

.match-info {
  width: 66px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.job-subtitle-section {
  font-size: 16px;
}

.icon-search {
  display: flex;
  align-items: center;
  margin-left: -3px;
}

.my-card {
  width: 100%;
  max-width: 310px;
  background-color: #fcf6f8 !important;
}

.company {
  font-size: 20px;
  font-weight: bold;
}
.round {
  border-radius: 100%;
  background-color: green;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
}

.separator {
  background-color: #bc3063;
  margin: 0 10px;
}
.subtitle {
  color: #808080;
  display: flex;
}
.salary {
  color: #808080;
}
.salary-value {
  color: #666666;
  font-size: 15px;
}

.job-title {
  margin-left: 3px;
}

.close-btn {
  top: 5px !important;
  right: 5px;
  position: absolute;
}

.modal-require {
  width: 150px;
  font-weight: bold;
}

.modal-match {
  width: 400px;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
}

.modal-improve {
  width: 170px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.modal-require-value {
  width: 150px;
  display: flex;
  align-items: center;
}

.modal-match-value {
  width: 400px;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
}

.modal-improve-value {
  width: 170px;
  display: flex;
  justify-content: center;
}

.ball {
  border-radius: 100%;
  width: 10px;
  height: 10px;
  margin-right: 5px;
}

.progress {
  width: 100%;
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.btn-register {
  display: flex;
  justify-content: center;
}

.bar {
  height: 5px;
  border-radius: 5px;
  width: 100%;
  width: 335px;
  position: absolute;
}
</style>

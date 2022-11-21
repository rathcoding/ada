<template>
  <q-page class="container q-gutter-md q-pl-md q-pr-md q-pt-md">
    <q-card class="q-pa-lg">
      <div class="row q-pb-md">
        <div class="col-md-12 title">
          <div class="icon-skill">
            <q-icon name="person_search" size="lg" color="primary" />
          </div>
          <div class="q-pl-sm">
            <span class="skill-title-section">Busca por Profissionais</span>
            <br />
            <span class="skill-subtitle-section">
              Encontre as profissionais com o melhor match para sua vaga!
            </span>
          </div>
        </div>
      </div>

      <q-card-section>
        <q-form
          @submit.prevent.stop="search"
          class="row q-pb-sm wrap justify-between"
        >
          <q-select
            class="col-md-9 col-xs-12"
            filled
            v-model="query"
            use-input
            use-chips
            multiple
            autogrow
            input-debounce="0"
            @new-value="createValue"
            :options="options.skill"
            @filter="filterFn"
            label="Adicione os skills que a profissional precisa ter..."
          />

          <q-btn
            class="col-md-2 col-xs-12"
            label="Buscar"
            type="submit"
            color="primary"
            size="lg"
          />
        </q-form>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md" v-if="professionals.length > 0">
      <q-list class="row q-gutter-md">
        <q-card
          elevated
          bordered
          class="my-card bg-grey-1"
          v-for="professional in professionals"
          :key="professional.id"
        >
          <div
            v-ripple
            @click="(proDialog = true), (professionalDetails = professional)"
            class="cursor-pointer relative-position"
          >
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="professional">{{ professional.name }}</div>
                  <div class="subtitle">
                    <div class="professional-email">
                      {{ professional.email }}
                    </div>
                  </div>
                </div>
                <div>
                  <div class="match-info" style="z-index: 9">
                    <div
                      class="q-ml-md round"
                      :style="{
                        opacity: professional.match * 0.01,
                        backgroundColor: 'green',
                      }"
                    >
                      {{ professional.match }}%
                    </div>
                  </div>
                  <div class="match-info">
                    <div class="q-ml-md round" style="background-color: grey">
                      {{ professional.match }}%
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-separator class="separator" />

            <q-card-section class="card-skills">
              <div style="font-weight: bold; margin-right: 2px">Skills:</div>
              <div
                class="card-skills"
                v-for="(skill, index) in professional.skills"
                :key="skill.id"
              >
                <div class="card-skills" v-if="index < 3">
                  {{ skill.description }}
                </div>
                <div
                  class="card-skills"
                  style="margin-right: 2px"
                  v-if="professional.skills.length - 1 !== index"
                >
                  ,
                </div>
              </div>
              <div v-if="professional.skills.length > 3">...</div>
            </q-card-section>
          </div>
        </q-card>
      </q-list>
    </q-card>
  </q-page>

  <q-dialog v-model="proDialog">
    <q-card style="min-width: 750px">
      <q-card-section class="row items-center q-pb-none">
        <q-card-section class="col-md-12">
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="company">{{ professionalDetails.name }}</div>
              <div class="subtitle">
                <div class="professional-email">
                  {{ professionalDetails.email }}
                </div>
              </div>
            </div>
            <div>
              <div class="match-info" style="z-index: 9">
                <div
                  class="q-ml-md round"
                  :style="{
                    opacity: professionalDetails.match * 0.01,
                    backgroundColor: 'green',
                  }"
                >
                  {{ professionalDetails.match }}%
                </div>
              </div>
              <div class="match-info">
                <div class="q-ml-md round" style="background-color: grey">
                  {{ professionalDetails.match }}%
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
        <div class="row items-center no-wrap" style="padding: 5px">
          <div class="modal-skill">Skill</div>
          <div class="modal-level">Nível</div>
          <div class="modal-experience">Experiência</div>
        </div>

        <div
          class="row items-center no-wrap"
          style="padding: 5px"
          v-for="(skill, index) in professionalDetails.skills"
          :key="skill.id"
        >
          <div class="modal-skill-value">
            <div class="ball" :style="{ backgroundColor: colors[index] }"></div>
            {{ skill.description }}
          </div>
          <div class="modal-level-value">
            <div class="progress">
              <div>
                <div
                  class="bar"
                  :style="{
                    backgroundColor: colors[index],
                  }"
                ></div>
              </div>
            </div>

            <div style="min-width: 34px">
              {{ skill.level }}
            </div>
          </div>
          <div class="modal-experience-value">{{ skill.experience }} Anos</div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { softMatch } from "../../utils/match";

let optionsForFilter = {};

export default {
  name: "SearchProfessionalCompany",

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const options = ref({});
    const query = ref([]);
    const professionals = ref([]);
    const proDialog = ref(false);
    const professionalDetails = ref({});

    onMounted(async () => {
      await api
        .get("/selects-resume")
        .then((res) => {
          options.value = res.data;
          optionsForFilter = res.data;
        })
        .catch((error) => {
          console.log(error);
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

    //-----------------------------------------------------------------------

    const createValue = (val, done) => {
      // Fonte: https://quasar.dev/vue-components/select#example--filtering-and-adding-to-menu
      if (val.length > 0) {
        if (!stringOptions.includes(val)) {
          stringOptions.push(val);
        }
        done(val, "toggle");
      }
    };
    //---------------------------------------------------------------------

    return {
      options,
      createValue,
      filterFn,
      query,
      professionals,
      proDialog,
      professionalDetails,
      router,
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
    async search() {
      this.professionals = [];

      const skillIdList = this.query.map((item) => item.value);
      let skillsJob = [];
      this.query.forEach((skill) => {
        skillsJob.push({
          id: skill.value,
        });
      });

      await api
        .post("/company/professional", { skillIdList: skillIdList })
        .then((res) => {
          let proList = res.data;
          for (let pro of res.data) {
            pro["match"] = parseInt(softMatch(skillsJob, pro.skills));
            this.professionals.push(pro);
            this.professionals.sort((a, b) => b.match - a.match); // a - b for ascending sort
          }
        })
        .catch((err) => {
          if (err.response) {
            this.$q.notify({
              color: "negative",
              message: err.response.data,
            });
            return;
          }
          this.$q.notify({
            color: "negative",
            message: "Erro no sistema. Tente mais tarde.",
          });
        });
    },
  },
};
</script>

<style>
.skill-title-section {
  font-size: 20px;
}

.professional-infos {
  width: 210px;
}

.match-info {
  width: 66px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.skill-subtitle-section {
  font-size: 16px;
}

.icon-skill {
  display: flex;
  align-items: center;
  margin-left: -3px;
}

.add-skill-title {
  display: flex;
  align-items: center;
}

.title {
  display: flex;
}

.professional-email-section {
  font-size: 20px;
}

.my-card {
  width: 100%;
  max-width: 310px;
}

.card-skills {
  display: flex;
}

.professional {
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
  background-color: #189199;
  margin: 0 10px;
}

.subtitle {
  color: #808080;
  display: flex;
}

.professional-email {
  margin-left: 3px;
}

.close-btn {
  top: 5px !important;
  right: 5px;
  position: absolute;
}

.modal-skill {
  width: 150px;
  font-weight: bold;
}

.modal-level {
  width: 400px;
  font-weight: bold;
  display: flex;
  padding-right: 5px;
  justify-content: flex-end;
}

.modal-experience {
  width: 170px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.modal-skill-value {
  width: 150px;
  display: flex;
  align-items: center;
}

.modal-level-value {
  width: 400px;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
}

.modal-experience-value {
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

.bar {
  height: 5px;
  border-radius: 5px;
  width: 100%;
  width: 335px;
  position: absolute;
}
</style>

<template>
  <q-page class="container q-gutter-md q-pl-md q-pr-md q-pt-md">
    <q-card class="q-pa-lg">
      <div class="row q-pb-md">
        <div class="col-md-12 title">
          <div class="icon-search">
            <q-icon name="handshake" size="lg" color="primary" />
          </div>
          <div class="q-pl-sm">
            <span class="job-title-section">Candidaturas</span>
            <br />
            <span class="job-subtitle-section">
              Acompanhe e gerencie as vagas que você se candidatou.
            </span>
          </div>
        </div>
      </div>
    </q-card>

    <q-card class="q-pa-lg">
      <q-list class="row q-gutter-md">
        <q-card
          elevated
          bordered
          class="my-card bg-grey-1"
          v-for="application in applications"
          :key="application.id"
        >
          <div class="relative-position">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="company">{{ application.company_name }}</div>
                  <div class="subtitle">
                    <div><q-icon name="person" size="es" /></div>
                    <div class="job-title">{{ application.job_title }}</div>
                  </div>
                </div>

                <div class="col-auto">
                  <div class="q-ml-md round">{{ application.match }}%</div>
                </div>
              </div>
            </q-card-section>

            <q-separator class="separator" />

            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="salary">Salário</div>
                  <div class="salary-value">
                    R${{ application.salary_min }} à R${{
                      application.salary_max
                    }}
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-slider
              class="q-at-md slider-application-professional"
              :disable="true"
              :model-value="application.stage_id"
              color="primary"
              markers
              :marker-labels="stageMarkers"
              :min="1"
              :max="7"
            />

            <div class="btn-actions-application">
              <q-btn
                class="q-ma-md"
                label="Ver Feedback"
                type="button"
                color="primary"
                size="sm"
                @click="(modal = true), (applicationSelected = application)"
                v-if="application.feedback.length > 0"
              />
              <q-btn
                class="q-ma-md"
                label="Declinar"
                type="button"
                color="primary"
                size="sm"
                @click="decline(application.id)"
              />
            </div>
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
              <div class="company">{{ applicationSelected.company_name }}</div>
              <div class="subtitle">
                <div><q-icon name="person" size="es" /></div>
                <div class="job-title">{{ applicationSelected.job_title }}</div>
              </div>
            </div>

            <div class="col-auto">
              <div class="q-ml-md round">{{ applicationSelected.match }}%</div>
            </div>
          </div>
        </q-card-section>

        <div class="close-btn">
          <q-btn icon="close" flat round dense v-close-popup />
        </div>
      </q-card-section>

      <q-separator class="separator" />

      <q-card-section>
        <div class="q-col-12">
          {{ applicationSelected.feedback }}
        </div>
      </q-card-section>
      <div class="btn-actions-application">
        <q-btn
          class="q-mb-md"
          label="Fechar"
          type="button"
          color="primary"
          size="sm"
          @click="modal = false"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

export default {
  name: "ApplicationProfessional",

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const query = ref([]);
    const applications = ref([]);
    const stages = ref([]);
    const step = ref([]);
    const stageMarkers = ref([]);
    const applicationSelected = ref({});

    onMounted(async () => {
      await api
        .get("/professional/application")
        .then((res) => {
          applications.value = res.data.data;
          stages.value = res.data.stages;
          stageMarkers.value = res.data.stages;
        })
        .catch((err) => {
          $q.notify({
            color: "negative",
            message: "Erro no sistema. Tente mais tarde.",
          });
        });
    });

    return {
      query,
      router,
      modal: ref(false),
      applications,
      stages,
      step,
      stageMarkers,
      applicationSelected,
    };
  },
  methods: {
    async decline(id) {
      await api
        .delete(`/professional/application/${id}`)
        .then(() => {
          const indexRemovedApplication = this.applications
            .map((application) => application.id)
            .indexOf(id);

          this.applications.splice(indexRemovedApplication, 1);

          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Removido com sucesso!",
          });
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            message: "Erro no sistema. Tente mais tarde.",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
}
.job-title-section {
  font-size: 20px;
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
  max-width: 510px;
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

.slider-application-professional,
.q-slider--h {
  padding: 0px 45px 22px 45px;
}

.slider-application-professional,
.q-slider--h,
.q-slider__marker-labels-container {
  font-size: 11px;
}

.btn-actions-application {
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn {
  top: 5px !important;
  right: 5px;
  position: absolute;
}
</style>

<template>
  <q-page class="container q-gutter-md q-pl-md q-pr-md q-pt-md">
    <q-card class="q-pa-lg">
      <div class="row q-pb-lg">
        <div class="col-md-12 title">
          <div class="icon-vaga">
            <q-icon name="handshake" size="lg" color="primary" />
          </div>
          <div class="q-pl-sm">
            <span class="vaga-title-section"> Gerenciar Candidatura </span>
            <br />
            <span class="vaga-subtitle-section">
              Esta profissional adorou sua vaga publicada! Dá uma olhada...
            </span>
          </div>
        </div>
      </div>

      <q-card-section>
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">
                {{ professional.name + " " + professional.last_name }}
              </div>
              <div class="text-subtitle2">
                {{ professional.email }}
              </div>
            </div>

            <div class="col-auto">
              <q-avatar
                size="60px"
                font-size="20px"
                text-color="white"
                color="green"
                class="q-ml-md"
                :style="{ opacity: 100 / 65 }"
              >
                {{ application.match }}%
              </q-avatar>
            </div>
          </div>
        </q-card-section>
      </q-card-section>

      <q-card-section>
        <q-table
          title="Skills da Candidata"
          :rows="professional.skills"
          :columns="skillColumns"
          row-key="id"
        >
        </q-table>
      </q-card-section>
    </q-card>

    <q-separator color="primary" class="q-my-md" />

    <q-card class="q-mb-md q-pa-lg">
      <div class="row q-pb-lg">
        <div class="col-md-12 title">
          <div class="icon-vaga">
            <q-icon name="forum" size="lg" color="primary" />
          </div>
          <div class="q-pl-sm">
            <span class="vaga-title-section"> Etapas da Candidatura </span>
            <br />
            <span class="vaga-subtitle-section">
              Gerencie o processo de candidatura através desta seção.
            </span>
          </div>
        </div>
      </div>

      <q-card-section class="q-gutter-md">
        <q-card-section>
          <q-slider
            class="q-at-md"
            :model-value="application.stage_id"
            @change="
              (val) => {
                application.stage_id = val;
              }
            "
            color="primary"
            markers
            :marker-labels="stageMarkers"
            :min="1"
            :max="7"
          />
        </q-card-section>
        <q-card-section :hidden="application.stage_id == 7 ? 0 : 1">
          <q-input
            v-model="application.feedback"
            filled
            type="textarea"
            label="Dê um feedback para nossa Ada saber como melhorar para a próxima oportunidade!"
            hint="Feedback"
          >
          </q-input>
        </q-card-section>
        <q-card-section class="row wrap q-gutter-xl justify-center">
          <q-btn
            style
            label="Salvar"
            color="primary"
            @click="updateApplication()"
            class="col-md-3 col-xs-12"
          />
          <q-btn
            class="col-md-3 col-xs-12"
            label="Voltar"
            @click="voltar()"
            outline
            color="primary"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

export default {
  name: "ManageJobCompany",

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const disabled = ref(true);
    const stageMarkers = ref([]);
    const application = ref({});
    const professional = ref({});
    const skillColumns = [
      {
        name: "skill",
        label: "Skill",
        align: "left",
        field: "description",
      },
      {
        name: "experience",
        label: "Anos de Experiência",
        field: "experience",
        align: "center",
      },

      {
        name: "level",
        label: "Nível",
        align: "center",
        field: "level",
      },
    ];

    onMounted(async () => {
      const applicationId = localStorage.getItem("editApplicationId");

      await api
        .get(`/company/job/application/${applicationId}`)
        .then((res) => {
          application.value = { ...res.data };
        })
        .catch((error) => {
          console.log(error);
          $q.notify({
            color: "negative",
            message: "Erro no sistema. Tente mais tarde.",
          });
        });

      await api
        .get(`/company/professional/${application.value.professional_id}`)
        .then((res) => {
          professional.value = { ...res.data };
        })
        .catch((error) => {
          console.log(error);
          $q.notify({
            color: "negative",
            message: "Erro no sistema. Tente mais tarde.",
          });
        });

      // Buscar Stages
      await api
        .get("/selects-resume")
        .then((res) => {
          stageMarkers.value = res.data.stage;
        })
        .catch((error) => {
          console.log(error);
          $q.notify({
            color: "negative",
            message: "Erro no sistema. Tente mais tarde.",
          });
        });
    });

    return {
      router,
      disabled,
      // matchLabel: computed(() => `${job.value.match_min} %`),
      skillColumns,
      stageMarkers,
      application,
      professional,
    };
  },
  methods: {
    async updateApplication() {
      if (this.application.stage_id === 7 && this.application.feedback === "") {
        this.application.feedback = "A empresa não forneceu um feedback...";
      }

      await api
        .put(`/company/job/application`, this.application)
        .then((res) => {
          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Salva com sucesso!",
          });
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
    voltar() {
      localStorage.removeItem("editApplicationId");
      this.router.go(-1);
    },
  },
};
</script>

<style>
.btn-save {
  height: 56px !important;
  align-items: center;
}

.vaga-title-section {
  font-size: 20px;
}

.vaga-subtitle-section {
  font-size: 16px;
}

.icon-vaga {
  display: flex;
  align-items: center;
  margin-left: -3px;
}

.add-vaga-title {
  display: flex;
  align-items: center;
}

.skill-title-section {
  font-size: 20px;
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

.my-card {
  width: 100%;
  max-width: 350px;
}
</style>

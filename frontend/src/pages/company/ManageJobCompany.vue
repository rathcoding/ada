<template>
  <q-page class="container q-gutter-md q-pl-md q-pr-md q-pt-md">
    <q-card class="q-pa-lg">
      <div class="row q-pb-lg">
        <div class="col-md-12 title">
          <div class="icon-vaga">
            <q-icon name="campaign" size="lg" color="primary" />
          </div>
          <div class="q-pl-sm">
            <span class="vaga-title-section">
              {{
                novo
                  ? "Nova Vaga"
                  : published
                  ? "Vaga Publicada"
                  : "Detalhes da Vaga"
              }}
            </span>
            <br />
            <span class="vaga-subtitle-section">
              {{
                novo
                  ? "Neste formulário você pode publicar uma nova vaga!"
                  : published
                  ? "Gerencie as candidaturas para esta vaga."
                  : "Gerencie a vaga através dos formulários abaixo."
              }}
            </span>
          </div>
        </div>
      </div>

      <q-card-section>
        <q-form @submit.prevent.stop="saveJob">
          <div class="row q-pb-lg wrap justify-between">
            <q-input
              required
              filled
              v-model="job.title"
              type="text"
              label="Título da vaga"
              class="col-md-12 col-xs-12"
              clearable
            />
          </div>
          <div class="row q-pb-lg wrap justify-between">
            <q-input
              required
              filled
              v-model="job.description"
              type="text"
              autogrow
              label="Descrição da vaga"
              hinf="Descreva brevemente o que será esperado de nossa profissional."
              class="col-md-12 col-xs-12"
              clearable
            />
          </div>

          <div class="row q-pb-lg wrap justify-between">
            <q-input
              required
              filled
              v-model="job.salary_min"
              type="number"
              prefix="R$"
              mask="##,##"
              fill-mask="0"
              reverse-fill-mask
              input-class="text-right"
              step="0.01"
              label="Remuneração Mínima"
              class="col-md-3 col-xs-12"
              min="0"
            />

            <q-input
              required
              filled
              v-model="job.salary_max"
              type="number"
              prefix="R$"
              mask="#,##"
              fill-mask="0"
              reverse-fill-mask
              input-class="text-right"
              step="0.01"
              label="Remuneração Máxima"
              class="col-md-3 col-xs-12"
              min="0"
            />

            <q-input
              filled
              type="date"
              v-model="job.dt_end"
              hint="Data de encerramento"
              class="col-md-3 col-xs-12"
            />
          </div>

          <div class="row q-pb-lg wrap justify-between">
            <div class="col-md-8 col-xs-12">
              <q-badge outline color="primary">
                Match mínimo da candidata (%)
              </q-badge>

              <q-slider
                v-model="job.match_min"
                :min="0"
                :max="100"
                :step="1"
                color="primary"
                label-always
                switch-label-side
                :label-value="matchLabel"
              />
            </div>

            <q-btn
              class="col-md-3 col-xs-12 btn-save"
              label="Salvar"
              type="submit"
              outline
              color="primary"
              :disabled="published"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <q-separator color="primary" class="q-my-md" />

    <q-card class="q-pa-lg">
      <q-form
        @submit.prevent.stop="saveSkill"
        class="row q-py-lg wrap justify-between"
      >
        <q-select
          :rules="[myRule]"
          filled
          v-model="skill"
          :options="options.skill"
          label="Skill"
          class="col-md-3 col-xs-12"
          emit-value
          map-options
          @filter="filterFn"
          use-input
          input-debounce="0"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-input
          required
          filled
          v-model="experience"
          type="number"
          step="0.1"
          label="Anos de experiência"
          class="col-md-3 col-xs-12"
          min="0"
        />

        <q-select
          :rules="[myRule]"
          filled
          v-model="level"
          :options="options.level"
          label="Nível"
          class="col-md-3 col-xs-12"
          emit-value
          map-options
          @filter="filterFn"
          use-input
          input-debounce="0"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template></q-select
        >

        <q-btn
          class="col-md-2 col-xs-12 btn-save"
          label="Adicionar"
          type="submit"
          outline
          color="primary"
          :disabled="novo || published"
        />
      </q-form>

      <q-table
        title="Skills Requisitados"
        :rows="rows"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              round
              icon="delete"
              color="negative"
              size="sm"
              class="cursor-pointer"
              @click="removeSkill(props.row)"
              :disabled="published"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-separator color="primary" class="q-my-md" />

    <q-card class="q-pa-lg">
      <q-card-section class="row wrap q-gutter-xl justify-center">
        <q-btn
          class="col-md-3 col-xs-12 btn-save"
          label="Publicar"
          @click="publishDialog = true"
          color="primary"
          :disabled="disabled || published"
        />
        <q-btn
          class="col-md-3 col-xs-12 btn-save"
          label="Voltar"
          @click="$router.go(-1)"
          outline
          color="primary"
        />
      </q-card-section>
    </q-card>

    <q-separator color="primary" class="q-my-md" />

    <q-card class="q-pa-lg q-mb-lg" :hidden="!published">
      <div class="row q-pb-lg">
        <div class="col-md-12 title">
          <div class="icon-vaga">
            <q-icon name="people" size="lg" color="primary" />
          </div>
          <div class="q-pl-sm">
            <span class="vaga-title-section">Canditadas a esta vaga</span>
            <br />
            <span class="vaga-subtitle-section">
              Estas são as profissionais interessadas nesta vaga!
            </span>
          </div>
        </div>
      </div>

      <q-list class="row q-gutter-md">
        <q-card
          class="my-card bg-grey-1 q-hoverable cursor-pointer"
          @click="manageApplication(application)"
          elevated
          bordered
          v-for="application in applications"
          :key="application.id"
        >
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ application.professional.name }}</div>
                <div class="text-subtitle2">
                  {{ application.professional.email }}
                </div>
              </div>

              <div class="col-auto">
                <q-avatar
                  size="60px"
                  font-size="20px"
                  text-color="white"
                  color="green"
                  class="q-ml-md"
                  :style="{ opacity: application.match / 65 }"
                >
                  {{ application.match }}%
                </q-avatar>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="row">
            <q-card-section class="col">Fase atual:</q-card-section>
            <q-card-section class="col">
              {{ application.stage.description }}
            </q-card-section>
          </q-card-section>

          <q-card-actions class="row"> </q-card-actions>
        </q-card>
      </q-list>
    </q-card>

    <q-dialog v-model="publishDialog" no-backdrop-dismiss>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            <q-icon name="warning" color="primary" size="32px" />
            Atençao!
          </div>
          <q-space />
        </q-card-section>
        <q-card-section class="q-pa-md">
          Esta operação não poderá ser desfeita.
        </q-card-section>
        <q-card-section class="q-pa-md">
          Após publicar a vaga, você não poderá alterar seus dados, apenas
          gerenciar as candidaturas das profissionais interessadas.
        </q-card-section>
        <q-card-section class="flex-center">
          Confirmar a publicação?
        </q-card-section>
        <q-card-actions class="justify-center">
          <q-btn
            label="Confirmar"
            color="primary"
            @click="publish()"
            class="q-mx-lg"
          />
          <q-btn
            label="Cancelar"
            color="primary"
            outline
            v-close-popup
            class="q-mx-lg"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

let optionsForFilter = {};

export default {
  name: "ManageJobCompany",

  setup() {
    const novo = ref(true);
    const disabled = ref(true);
    const published = ref(false);
    const publishDialog = ref(false);
    const job = ref({
      title: ref(""),
      description: ref(""),
      salary_min: ref(0.0),
      salary_max: ref(0.0),
      dt_start: ref(""),
      dt_end: ref(""),
      match_min: ref(50.0),
    });
    const router = useRouter();
    const $q = useQuasar();
    const options = ref({});
    const stageMarkers = ref([]);
    const experience = ref(null);
    const skill = ref(null);
    const level = ref(null);
    const rows = ref([]);
    const columns = [
      {
        name: "skill",
        label: "Skill",
        align: "left",
        field: (row) => row.skill.description,
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
        field: (row) => row.level.description,
      },
      {
        name: "actions",
        label: "Ações",
        align: "center",
      },
    ];
    const applications = ref([]);

    onMounted(async () => {
      localStorage.removeItem("editApplicationId");

      // Verifica se é para editar
      if (localStorage.getItem("editJobId")) {
        novo.value = false;
        // Busca dados do Job para preencher o form

        const jobId = localStorage.getItem("editJobId");

        await api
          .get(`/company/job/${jobId}`)
          .then((res) => {
            job.value = res.data;
          })
          .catch((error) => {
            console.log(error);
            $q.notify({
              color: "negative",
              message: "Erro no sistema. Tente mais tarde.",
            });
          });

        // Busca skills da vaga:
        await api
          .get(`/company/job/skill/${jobId}`)
          .then((res) => {
            rows.value = res.data;
            if (res.data.length > 0) {
              disabled.value = false;
            }
          })
          .catch((error) => {
            console.log(error);
            $q.notify({
              color: "negative",
              message: "Erro no sistema. Tente mais tarde.",
            });
          });

        // Verifica se a vaga já foi publicada
        if (job.value.dt_start) {
          published.value = true;

          // Busca applications para a vaga
          await api
            .get(`/company/job/applications/${jobId}`)
            .then((res) => {
              applications.value = res.data;
              applications.value.sort((a, b) => b.match - a.match); // a - b for ascending sort
            })
            .catch((error) => {
              console.log(error);
              $q.notify({
                color: "negative",
                message: "Erro no sistema. Tente mais tarde.",
              });
            });
        }
      }
      // Buscar dados para os selects...
      await api
        .get("/selects-resume")
        .then((res) => {
          options.value = res.data;
          optionsForFilter = res.data;
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

    const onEdit = (row) => {
      experience.value = row.experience;
      skill.value = row.skill_id;
      level.value = row.level_id;
    };

    const onDelete = (row) => {
      this.removeSkill(row.id);
    };

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
      novo,
      disabled,
      published,
      publishDialog,
      job,
      matchLabel: computed(() => `${job.value.match_min} %`),
      pagination: {
        rowsPerPage: 0,
      },
      experience,
      skill,
      level,
      options,
      columns,
      rows,
      router,
      filterFn,
      onEdit,
      onDelete,
      applications,
      stageMarkers,
    };
  },
  methods: {
    async saveJob() {
      await api
        .post("/company/job", { ...this.job })
        .then((res) => {
          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Salvo com sucesso!",
          });
          localStorage.setItem("editJobId", res.data.id);
          this.novo = false;
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
    async publish() {
      // seta dt_start em now() e enviar UPDATE para API.
      let dateObj = new Date();
      const dt_start = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
      this.job["dt_start"] = dt_start;

      await api
        .put("/company/job", { ...this.job })
        .then((res) => {
          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Publicada com sucesso!",
          });
          this.router.push({ name: "JobsCompany" });
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
    async saveSkill() {
      await api
        .post("/company/job/skill", {
          experience: parseFloat(this.experience),
          skill_id: this.skill,
          level_id: this.level,
          job_id: localStorage.getItem("editJobId"),
        })
        .then((res) => {
          this.rows.push(res.data);
          this.experience = null;
          this.skill = null;
          this.level = null;

          if (this.rows.length > 0) {
            this.disabled = false;
          }

          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Salvo com sucesso!",
          });
        })
        .catch((err) => {
          if (err.response) {
            console.log(err);
            this.$q.notify({
              color: "negative",
              message: err.response.data,
            });

            return;
          }
        });
    },
    async removeSkill(row) {
      await api
        .delete(`/company/job/skill/${row.id}`)
        .then(() => {
          const indexRemovedSkill = this.rows
            .map((row) => row.id)
            .indexOf(row.id);

          this.rows.splice(indexRemovedSkill, 1);

          if (this.rows.length < 1) {
            this.disabled = true;
          }

          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Removido com sucesso!",
          });
        })
        .catch((err) => {
          this.$q.notify({
            color: "negative",
            message: "Erro no sistema. Tente mais tarde.",
          });
        });
    },
    myRule(val) {
      if (val === null) {
        return "You must make a selection!";
      }
    },
    manageApplication(application) {
      localStorage.setItem("editApplicationId", application.id);
      this.router.push({ name: "ManageApplicationCompany" });
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

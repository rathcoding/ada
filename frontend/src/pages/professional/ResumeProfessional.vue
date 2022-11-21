<template>
  <q-page class="container q-gutter-md q-pl-md q-pr-md q-pt-md">
    <q-card class="q-pa-lg">
      <div class="row q-pb-xl">
        <div class="col-md-12 title">
          <div class="icon-skill">
            <q-icon name="description" size="lg" color="primary" />
          </div>
          <div class="q-pl-sm">
            <span class="skill-title-section">Skills</span>
            <br />
            <span class="skill-subtitle-section">Suas skills</span>
          </div>
        </div>
      </div>

      <div class="row q-pb-sm">
        <div class="col-md-12 add-skill-title">
          <q-icon name="description" size="sm" color="primary" />
          <span>Adicionar Skill</span>
        </div>
      </div>

      <q-form
        @submit.prevent.stop="saveSkill"
        class="row q-pb-lg wrap justify-between"
      >
        <q-select
          :rules="[(val) => !!val || 'Field is required']"
          filled
          v-model="skill"
          ref="inputSkillProfessional"
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
          </template></q-select
        >

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
          :rules="[(val) => !!val || 'Field is required']"
          filled
          v-model="level"
          ref="inputLevelProfessional"
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
          label="Salvar"
          type="submit"
          outline
          color="primary"
          v-close-popup
        />
      </q-form>

      <q-table title="Skills" :rows="rows" :columns="columns" row-key="id">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-icon
              name="delete"
              color="primary"
              size="sm"
              class="cursor-pointer"
              @click="removeSkill(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

let optionsForFilter = {};
export default {
  name: "ResumeProfessional",

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const options = ref({});
    const rows = ref([]);
    const experience = ref(null);
    const skill = ref(null);
    const level = ref(null);
    const inputSkillProfessional = ref(null);
    const inputLevelProfessional = ref(null);
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
        field: "calcium",
        align: "center",
      },
    ];

    onMounted(async () => {
      await api
        .get("/resume")
        .then((res) => {
          rows.value = res.data;
        })
        .catch((error) => {
          console.log(error);
          $q.notify({
            color: "negative",
            message: "Erro no sistema. Tente mais tarde.",
          });
        });

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
      onDelete,
      onEdit,
      inputSkillProfessional,
      inputLevelProfessional,
    };
  },
  methods: {
    async saveSkill() {
      const value = {
        experience: parseFloat(this.experience),
        skill_id: this.skill,
        level_id: this.level,
      };

      this.skill = null;
      this.level = null;
      this.experience = null;

      await api
        .post("/skill", value)
        .then((res) => {
          this.rows.push(res.data);
          this.inputSkillProfessional.resetValidation();
          this.inputLevelProfessional.resetValidation();

          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Salvo com sucesso!",
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

    async removeSkill(row) {
      await api
        .delete(`/skill/${row.id}`)
        .then(() => {
          const indexRemovedSkill = this.rows
            .map((row) => row.id)
            .indexOf(row.id);

          this.rows.splice(indexRemovedSkill, 1);

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
    myRule(val) {
      if (val === null) {
        return "You must make a selection!";
      }
    },
  },
};
</script>

<style>
.btn-save {
  height: 56px !important;
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
</style>

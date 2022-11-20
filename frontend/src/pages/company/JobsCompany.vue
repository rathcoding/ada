<template>
  <q-page class="container q-gutter-md q-pl-md q-pr-md q-pt-md">
    <q-card class="q-pa-lg">
      <div class="row q-pb-xl">
        <div class="col-md-12 title">
          <div class="icon-skill">
            <q-icon name="format_list_bulleted" size="lg" color="primary" />
          </div>
          <div class="q-pl-sm">
            <span class="skill-title-section">Vagas</span>
            <br />
            <span class="skill-subtitle-section">
              Estas são as vagas publicadas por sua empresa:
            </span>
          </div>
        </div>
      </div>
      <q-table :rows="rows" :columns="columns" row-key="id">
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="add_circle_outline"
            label="Nova Vaga"
            @click="createJob()"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="justify-center">
            <q-btn
              icon="visibility"
              round
              color="primary"
              size="sm"
              class="cursor-pointer q-mx-sm"
              @click="editJob(props.row)"
            />
            <q-btn
              icon="delete"
              round
              color="negative"
              size="sm"
              class="cursor-pointer q-mx-sm"
              @click="
                deleteDialog = true;
                deletingRow = props.row;
              "
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="deleteDialog" no-backdrop-dismiss>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Confirmar Exclusão?</div>
          <q-space />
        </q-card-section>
        <q-card-section class="q-pt-none"
          >Esta operação não poderá ser desfeita.</q-card-section
        >
        <q-card-actions class="flex-center">
          <q-btn
            label="Excluir"
            color="primary"
            @click="removeJob(deletingRow)"
          />
          <q-btn label="Cancelar" flat v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

let optionsForFilter = {};
export default {
  name: "JobsCompany",

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const rows = ref([]);
    const deleteDialog = ref(false);
    const deletingRow = ref({});
    const columns = [
      {
        name: "title",
        label: "Título da vaga",
        align: "left",
        field: "title",
      },
      {
        name: "dt_start",
        label: "Data de Publicação",
        field: "dt_start",
        align: "center",
      },
      {
        name: "dt_end",
        label: "Data de Encerramento",
        field: "dt_end",
        align: "center",
      },
      {
        name: "applications",
        label: "Candidatas",
        field: "applications",
        align: "center",
      },
      {
        name: "actions",
        label: "Ações",
        align: "center",
      },
    ];

    onMounted(async () => {
      if (localStorage.getItem("editJobId")) {
        localStorage.removeItem("editJobId");
      }

      await api
        .get("/company/job")
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
    });

    return {
      pagination: {
        rowsPerPage: 0,
      },
      columns,
      rows,
      deleteDialog,
      deletingRow,
      router,
    };
  },
  methods: {
    async removeJob(row) {
      await api
        .delete(`/company/job/${row.id}`)
        .then(() => {
          const indexRemovedJob = this.rows
            .map((row) => row.id)
            .indexOf(row.id);

          this.rows.splice(indexRemovedJob, 1);
          this.deleteDialog = false;

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
    editJob(row) {
      localStorage.setItem("editJobId", row.id);
      this.router.push({ name: "ManageJobCompany" });
    },
    createJob() {
      this.router.push({ name: "ManageJobCompany" });
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

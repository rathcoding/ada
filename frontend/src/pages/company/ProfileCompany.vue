<template>
  <q-page class="flex flex-center">
    <q-card square bordered class="q-pa-lg shadow-1 width-profile">
      <q-card-section class="text-center q-pa-none">
        <div class="text-h6">Atualizar Perfil da Empresa:</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent.stop="update" class="q-gutter-md">
          <q-input
            required
            filled
            type="text"
            v-model="company.name"
            label="Nome da Empresa"
            :rules="nameRules"
          />

          <q-input
            filled
            type="textarea"
            v-model="company.description"
            label="Descrição"
          />

          <q-input
            required
            filled
            v-model="company.cnpj"
            label="CNPJ *"
            :rules="cnpjRules"
            mask="##.###.###/####-##"
            fill-mask="#"
            unmasked-value
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Password *"
            :rules="passwordRules"
          />

          <q-input
            filled
            type="password"
            v-model="password2"
            label="Confirme o password *"
            :rules="password2Rules"
          />

          <q-btn
            label="Atualizar"
            type="submit"
            color="primary"
            size="lg"
            class="full-width"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

export default {
  name: "ProfileCompany",

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const company = ref({
      name: ref(""),
      description: ref(""),
      cnpj: ref(""),
    });

    onMounted(async () => {
      await api
        .get("/company")
        .then((res) => {
          // Ajustar pra inserir os valores retornado no form
          company.value.name = res.data.name;
          company.value.description = res.data.description;
          company.value.cnpj = res.data.cnpj;
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
      company,

      nameRules: [(val) => (val && val.length > 0) || "Campo obrigatório"],

      emailRules: [(val) => (val && val.length > 0) || "Campo obrigatório."],

      cnpjRules: [(val) => (val && val.length >= 14) || "Campo obrigatório."],

      password: "",
      passwordRules: [
        // (val) => val.length > 5 || "Tamanho mínimo: 6 caracteres",
      ],

      password2: "",
      password2Rules: [],

      router,
    };
  },
  methods: {
    async update() {
      // Verificar se passwords são iguais:
      if (this.password) {
        if (this.password !== this.password2) {
          this.$q.notify({
            color: "negative",
            message: "Passwords diferentes.",
          });
        } else {
          this.company["password"] = this.password;
        }
      }

      await api
        .put("/company/profile", this.company)
        .then((res) => {
          if (res.status === 200) {
            this.$q.notify({
              icon: "done",
              color: "positive",
              message: "Perfil atualizado!",
            });
            this.router.push({ name: "profileCompany" });
          }
        })
        .catch((error) => {
          console.log(error);
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
.width-profile {
  width: 360px;
}
</style>

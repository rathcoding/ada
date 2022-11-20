<template>
  <q-page class="flex flex-center">
    <q-card square bordered class="q-pa-lg shadow-1 width-login">
      <q-card-section class="text-center q-pa-none">
        <div class="text-h6">Login da Empresa</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="login" class="q-gutter-md">
          <q-input
            filled
            type="email"
            v-model="email"
            label="E-mail"
            :rules="emailRules"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Password"
            :rules="passwordRules"
          />

          <q-btn
            label="Entrar"
            type="submit"
            color="primary"
            size="lg"
            class="full-width"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-6">
          Não tem cadastro?
          <router-link to="/company/register">Cadastrar-se</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { api } from "../../boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { setCssVar } from "quasar";

export default {
  name: "LoginCompany",

  setup() {
    setCssVar("primary", "#189199");
    setCssVar("secondary", "#D4EBE8");
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    return {
      email,
      password,
      emailRules: [(val) => (val && val.length > 0) || "Campo obrigatório."],
      passwordRules: [
        (val) => (val !== null && val !== "") || "Campo obrigatório.",
        (val) => val.length > 5 || "Tamanho mínimo: 6 caracteres",
      ],

      router,
    };
  },
  methods: {
    async login() {
      // Autenticar com a API...
      const email = this.email;
      const password = this.password;

      await api
        .post("/company/login", { email, password })
        .then((res) => {
          api.defaults.headers.common["Authorization"] = res.data.token;
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("userType", "company");

          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Bem vinda!",
          });

          this.router.push({ name: "HomeCompany" });
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            message: "Login ou Password inválido(s).",
          });
          return;
        });
    },
  },
};
</script>

<style>
.width-login {
  width: 360px;
}
</style>

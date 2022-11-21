<template>
  <q-page class="flex flex-center">
    <q-card square bordered class="q-pa-lg shadow-1 width-profile">
      <q-card-section class="text-center q-pa-none">
        <div class="text-h6">Atualizar Perfil:</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent.stop="update" class="q-gutter-md">
          <q-input
            required
            filled
            type="text"
            v-model="professional.name"
            label="Primeiro nome *"
            :rules="nomeRules"
          />

          <q-input
            filled
            type="text"
            v-model="professional.last_name"
            label="Sobrenome"
          />

          <q-input
            filled
            type="date"
            v-model="professional.birth_date"
            hint="Data de nascimento"
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
            bordered
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

// const professional = ref({});

export default {
  name: "ProfileProfessional",

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const professional = ref({
      name: ref(""),
      last_name: ref(""),
      birth_date: ref(""),
    });

    onMounted(async () => {
      await api
        .get("/profile")
        .then((res) => {
          // Ajustar pra inserir os valores retornado no form
          professional.value.name = res.data.name;
          professional.value.last_name = res.data.last_name;
          professional.value.birth_date = res.data.birth_date;
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
      professional,

      nomeRules: [(val) => (val && val.length > 0) || "Campo obrigatório"],

      emailRules: [(val) => (val && val.length > 0) || "Campo obrigatório."],

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
          return;
        } else {
          this.professional["password"] = this.password;
        }
      }

      // const professional = this.professional;

      await api
        .put("/profile", this.professional)
        .then((res) => {
          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Perfil atualizado!",
          });

          this.router.push({ name: "ProfileProfessional" });
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

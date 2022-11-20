<template>
  <q-page class="flex flex-center">
    <q-card square bordered class="q-pa-lg shadow-1 width-register">
      <q-card-section class="text-center q-pa-none">
        <div class="text-h6">Registre sua Empresa!</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent.stop="register" class="q-gutter-md">
          <q-input
            required
            filled
            type="text"
            v-model="company.name"
            label="Nome da empresa *"
            :rules="nameRules"
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
            type="email"
            v-model="company.email"
            label="E-mail *"
            :rules="emailRules"
          />

          <q-input
            filled
            type="password"
            v-model="company.password"
            label="Password *"
            :rules="passwordRules"
          />

          <q-input
            filled
            type="password"
            v-model="passwordConfirm"
            label="Confirme o password *"
            :rules="passwordRules"
          />

          <q-card-section class="text-center q-pa-none">
            <q-toggle v-model="accept" label="Eu aceito os termos de uso *" />
            <q-btn
              flat
              round
              dense
              icon="description"
              color="primary"
              @click="termos = true"
            />
          </q-card-section>

          <q-btn
            label="Registrar"
            type="submit"
            color="primary"
            size="lg"
            class="full-width"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-6">* campos obrigatórios</p>
      </q-card-section>
    </q-card>
  </q-page>

  <q-dialog v-model="termos" no-backdrop-dismiss>
    <q-card>
      <q-card-section>
        <div class="text-h6" text-color="primary">Termos de Uso:</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Este site é um
        <strong class="text-primary">projeto acadêmico</strong> desenvolvido
        como trabalho de conclusão do curso de Análise e Desenvolvimento de
        Sistemas da faculdade FIAP. <br /><br /><strong class="text-primary">
          Seu conteúdo é fictício</strong
        >
        e não corresponde a profissionais, empresas e/ou vagas reais. O cadastro
        neste site é de livre e expontânea vontade. <br /><br /><strong
          class="text-primary"
          >Os criadores deste site não se responsabilizam por informações
          fornecidas pelos seus usuários.</strong
        >
      </q-card-section>

      <q-card-actions class="justify-center">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { setCssVar } from "quasar";
import { api } from "../../boot/axios";

export default {
  name: "RegisterCompany",

  setup() {
    setCssVar("primary", "#189199");
    setCssVar("secondary", "#D4EBE8");
    const router = useRouter();

    const isValidEmail = (val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val);
    };

    return {
      company: ref({
        name: ref(null),
        email: ref(null),
        cnpj: ref(null),
        password: ref(null),
      }),
      passwordConfirm: ref(null),
      accept: ref(false),
      termos: ref(false),

      nameRules: [(val) => (val && val.length > 0) || "Campo obrigatório"],
      cnpjRules: [(val) => (val && val.length >= 14) || "Campo obrigatório."],
      emailRules: [(val) => !!val || "Campo obrigatório.", isValidEmail],
      passwordRules: [
        (val) => (val !== null && val !== "") || "Campo obrigatório.",
        (val) => val.length > 5 || "Tamanho mínimo: 6 caracteres",
      ],
      isValidEmail,
      router,
    };
  },
  methods: {
    async register() {
      // Verificar o nome foi informado:
      if (!this.company.name) {
        this.$q.notify({
          color: "negative",
          message: "Você precisa informar um nome",
        });
        return;
      }

      // Verificar o CNPJ foi informado:
      if (this.company.cnpj.length < 14) {
        this.$q.notify({
          color: "negative",
          message: "Informe um CNPJ válido",
        });
        return;
      }

      // Verificar o email foi informado:
      if (!this.isValidEmail(this.company.email)) {
        this.$q.notify({
          color: "negative",
          message: "Você precisa informar um e-mail válido",
        });
        return;
      }

      // Verificar o password foi informado:
      if (this.company.password.length < 6) {
        this.$q.notify({
          color: "negative",
          message: "Você precisa informar um password válido.",
        });
        return;
      }

      // Verificar se passwords são iguais:
      if (this.company.password !== this.passwordConfirm) {
        this.$q.notify({
          color: "negative",
          message: "Passwords diferentes.",
        });
        return;
      }

      // Verificar se aceitou os Termos de Uso:
      if (!this.accept) {
        this.$q.notify({
          color: "negative",
          message: "Você precisa aceitar os termos de uso.",
        });
        return;
      }

      // Formulário OK.
      // Enviar request para criar usuário:
      await api
        .post("/company/register", this.company)
        .then((res) => {
          if (res.status === 201) {
            this.$q.notify({
              icon: "done",
              color: "positive",
              message: "Cadastrada com sucesso!",
            });
            this.router.push({ name: "LoginCompany" });
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            this.$q.notify({
              color: "negative",
              message: "E-mail já cadastrado.",
            });
          } else {
            // Caso contrário, erro interno no servidor:
            this.$q.notify({
              color: "negative",
              message: "Erro interno. Tente mais tarde.",
            });
          }
        });
    },
  },
};
</script>

<style>
.width-register {
  width: 360px;
}
</style>

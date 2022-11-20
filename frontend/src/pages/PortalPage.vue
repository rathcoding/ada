<template>
  <q-page class="flex flex-center q-gutter-md">
    <div class="row vertical-middle">
      <div class="col-12 col-md-6 q-gutter-md items-center justify-center">
        <div class="row q-pa-md">
          <q-img style="width: 50%" src="../../public/logo.png" />
          <h4>
            Sua nova plataforma digital para conectar profissionais mulheres às
            empresas de tecnologia acaba de chegar!
          </h4>
          <p>
            Viemos para facilitar a jornada de mulheres na busca de
            oportunidades no mercado de tecnologia. Aqui
            <strong class="text-primary"
              >não tem síndrome da impostora que nos pare</strong
            >! A plataforma traz para nossas
            <strong class="text-primary">ADAs</strong> um espaço de interação,
            conhecimento, troca e muitas vagas em empresas de tecnologia. Vamos
            juntas?
          </p>
        </div>
        <div class="row flex-center q-gutter-lg q-mt-lg">
          <q-btn
            icon="person"
            label="Para Profissionais"
            color="primary"
            size="md"
            class="width-button"
            @click="professionals()"
          />
          <q-btn
            icon="business"
            label="Para Empresas"
            color="primary"
            outline
            size="md"
            class="width-button"
            @click="companies()"
          />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="row q-pa-md">
          <q-img style="width: 80%" src="../../public/ada_bot.png" />
        </div>
      </div>
    </div>
  </q-page>

  <q-dialog v-model="disclaimer" no-backdrop-dismiss>
    <q-card>
      <q-card-section>
        <div class="text-h6" text-color="primary">Atenção:</div>
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
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { setCssVar } from "quasar";
import { ref } from "vue";

export default defineComponent({
  name: "PortalPage",
  setup() {
    setCssVar("primary", "#bc3063");
    setCssVar("secondary", "#F5E0E8");
    const router = useRouter();
    return {
      disclaimer: ref(false),
      router,
    };
  },
  methods: {
    professionals() {
      // Mudar theme?
      this.router.push({ name: "LoginProfessional" });
    },
    companies() {
      // Mudar theme?
      this.router.push({ name: "LoginCompany" });
    },
  },
});
</script>

<style>
.width-button {
  width: 220px;
}
</style>

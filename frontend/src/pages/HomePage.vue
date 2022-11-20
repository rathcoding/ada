<template>
  <q-page class="flex flex-center q-gutter-md">
    <div class="row vertical-middle q-pa-lg">
      <div
        class="col-12 col-md-6 q-gutter-md items-center justify-center q-pa-lg"
      >
        <q-img style="width: 50%" src="../../public/logo.png" />
        <h4>
          Sua nova plataforma digital para conectar profissionais mulheres às
          empresas de tecnologia acaba de chegar!
        </h4>
        <p>
          Viemos para facilitar a jornada de mulheres na busca de oportunidades
          no mercado de tecnologia. Aqui
          <strong class="text-primary"
            >não tem síndrome da impostora que nos pare</strong
          >! A plataforma traz para nossas
          <strong class="text-primary">ADAs</strong> um espaço de interação,
          conhecimento, troca e muitas vagas em empresas de tecnologia. Vamos
          juntas?
        </p>
      </div>
      <div class="col-12 col-md-6">
        <div class="row q-pa-lg">
          <q-img style="width: 80%" src="../../public/ada_bot.png" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomePage",
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
  methods: {},
});
</script>

<style>
.width-button {
  width: 220px;
}
</style>

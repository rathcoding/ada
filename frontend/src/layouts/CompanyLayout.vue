<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          ADA - Network for Women in Tech
        </q-toolbar-title>
        <q-btn flat round dense icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <div class="column items-center q-pa-lg">
        <q-img src="../../public/ada.png" class="center" :ratio="1" />
        <q-separator />
      </div>

      <q-separator color="primary" />

      <q-list bordered>
        <q-item clickable v-ripple exact to="/company">
          <q-item-section avatar>
            <q-icon name="home" color="primary" />
          </q-item-section>
          <q-item-section color="primary">Home</q-item-section>
        </q-item>

        <q-separator color="primary" />

        <q-item clickable v-ripple exact to="/company/profile">
          <q-item-section avatar>
            <q-icon name="business" color="primary" />
          </q-item-section>
          <q-item-section color="primary">Dados da Empresa</q-item-section>
        </q-item>

        <q-separator color="primary" />

        <q-item clickable v-ripple exact to="/company/jobs">
          <q-item-section avatar>
            <q-icon name="campaign" color="primary" />
          </q-item-section>
          <q-item-section color="primary">Vagas</q-item-section>
        </q-item>

        <q-separator color="primary" />

        <q-item
          clickable
          v-ripple
          exact
          to="/company/professional"
          color="primary"
        >
          <q-item-section avatar>
            <q-icon name="person_search" color="primary" />
          </q-item-section>
          <q-item-section color="primary">Profissionais</q-item-section>
        </q-item>
      </q-list>

      <q-separator color="primary" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { setCssVar } from "quasar";

export default {
  setup() {
    setCssVar("primary", "#189199");
    setCssVar("secondary", "#D4EBE8");
    const leftDrawerOpen = ref(false);
    const router = useRouter();

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userType");
        router.push({ name: "portal" });
      },
    };
  },
};
</script>

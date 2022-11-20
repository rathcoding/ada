<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          ADA - Network for Women in Tech
        </q-toolbar-title>
        <div v-if="$route.name === 'portal'">
          <q-btn disabled flat round dense icon="arrow_back" />
        </div>
        <div v-else>
          <q-btn flat round dense icon="arrow_back" @click="$router.go(-1)" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

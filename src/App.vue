<template>
  <v-app :theme="_store.theme">
    <v-main>
      <v-container class="fill-height pa-3 pa-sm5 pa-md-10">
        <router-view />
        <v-icon
          @click="_store.changeTheme"
          class="icon cursor-pointer pa-5"
          rounde="xl"
          :icon="_store.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import app from "./db/db";
import store from "./store/pinia";

const _store = store();
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

body {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
}
.icon {
  position: absolute !important;
  bottom: 5%;
  right: 5%;
  transition: all 0.2s ease;
  border: 1px solid #6200ea;
  border-radius: 50%;
}
.icon:hover {
  background-color: #6200ea;
  color: #fff;
  transform: rotate(360deg);
}
</style>

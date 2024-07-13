<template>
  <v-row class="d-flex justify-center align-center fill-height">
    <v-col
      class="wrapper pa-10 bg-transparent rounded-xl d-flex flex-column ga-5"
      cols="12"
      sm="8"
      md="6"
    >
      <h3 class="text-h5 text-sm-h4">Welcome to Chat App</h3>
      <v-divider />
      <v-form @submit.prevent="validate" ref="formRef">
        <v-text-field
          :rules="rules.name"
          v-model="models.name"
          variant="outlined"
          label="Name"
          rounded="xl"
          color="deep-purple-accent-4"
        />
        <v-btn
          type="submit"
          class="border-none bg-deep-purple-accent-4"
          rounded="xl"
          variant="outlined"
          block
          >Start</v-btn
        >
      </v-form>
    </v-col>
  </v-row>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import store from "../store/pinia";

const router = useRouter();
const _store = store();

const formRef = ref(null);
const models = ref({
  name: "",
});
const rules = reactive({
  name: [
    (v) => !!v || "name  is required!",
    (v) => (v && v.length > 2) || "Your name must be longer than 2",
  ],
});

const startChat = () => {
  _store.setUser(models.value.name);
  router.replace("/chat");
};

const validate = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    startChat();
  }
};
</script>
<style scoped>
.wrapper {
  box-shadow: 0 0 1.5rem #6200ea;
}
</style>

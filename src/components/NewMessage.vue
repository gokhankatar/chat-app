<template>
  <v-form @submit.prevent="validate" ref="chatRef">
    <v-text-field
      :rules="rules.msg"
      v-model="models.newMsg"
      variant="outlined"
      label="Message"
      placeholder="Type and enter"
      rounded="xl"
      color="deep-purple-accent-4"
      clearable
    />
  </v-form>
</template>
<script setup>
import { ref, reactive } from "vue";
import store from "../store/pinia";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const _store = store();

const chatRef = ref(null);
const models = ref({
  newMsg: "",
});

const rules = reactive({
  msg: [
    (v) => !!v || "Message  is required!",
    (v) => (v && v.length > 3) || "Your message must be longer than 3 charachters",
  ],
});

const db = getFirestore();
const colRef = collection(db, "messages");

const addMsg = async () => {
  try {
    await addDoc(colRef, {
      content: models.value.newMsg,
      name: _store.currentUser,
      date: Date.now(),
    });
    chatRef.value.reset();
  } catch (error) {
    console.error(error.message);
  }
};

const validate = async () => {
  const { valid } = await chatRef.value.validate();

  if (valid) {
    addMsg();
  }
};
</script>
<style scoped></style>

<template>
  <v-row class="pa-10 d-flex justify-center ga-5 fill-height">
    <v-col cols="12" sm="12" md="8" class="d-flex flex-column">
      <h5 class="my-10 text-subtitle-1 text-sm-h5">
        <span>Welcome</span> &nbsp;
        <span class="text-deep-purple-accent-4">{{ _store.currentUser }},</span>
      </h5>
      <div class="d-flex justify-space-between align-center">
        <span class="name text-caption">Name</span>
        <span class="msg text-caption">Message</span>
        <span class="time text-caption">Time</span>
      </div>
      <v-divider class="mb-5" />
      <NewMessage />
      <div
        :class="_store.theme === 'dark' ? 'msg-wrapper-dark' : 'msg-wrapper-light'"
        class="my-4 rounded-lg pa-4 d-flex flex-column"
        v-for="item of messages"
        :key="item"
      >
        <p class="message pa-3 subtitle-1">{{ item.content }}</p>
        <div class="infos d-flex justify-space-between">
          <span
            :class="
              _store.theme === 'dark'
                ? 'text-blue-grey-lighten-2'
                : 'text-deep-purple-accent-4'
            "
            class="name text-caption"
            >{{ item.name }}</span
          >
          <span
            :class="
              _store.theme === 'dark'
                ? 'text-blue-grey-lighten-2'
                : 'text-deep-purple-accent-4'
            "
            class="time text-caption"
            >{{ item.date }}</span
          >
        </div>
      </div>
    </v-col>
  </v-row>

  <v-btn
    class="exit-btn"
    @click="closeChat"
    variant="outlined"
    rounded="xl"
    color="deep-purple-accent-4"
    >Exit App</v-btn
  >
</template>
<script setup>
import store from "../store/pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import NewMessage from "../components/NewMessage.vue";
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import moment from "moment";

const router = useRouter();
const _store = store();
const messages = ref([]);

const closeChat = () => {
  _store.clearUser();
  router.replace("/");
};

const db = getFirestore();
const colRef = collection(db, "messages");

const q = query(colRef, orderBy("date", "desc"));

onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((s) => {
    if (s.type === "added") {
      let doc = s.doc;
      messages.value.push({
        name: doc.data().name,
        content: doc.data().content,
        date: moment(doc.data().date).calendar(),
        id: doc.id,
      });
    }
  });
});
</script>
<style scoped>
.msg-wrapper-dark {
  background: rgba(255, 255, 255, 0.2);
}
.msg-wrapper-light {
  background: rgba(0, 0, 0, 0.2);
}
.exit-btn {
  position: absolute;
  bottom: 5%;
  left: 5%;
}
</style>

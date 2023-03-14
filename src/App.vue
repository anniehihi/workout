<template>
  <div v-if="appReady" class="min-h-full box-border font-sans">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { ref } from "vue";
import { supabase } from "./supabase/supabaseClient";
import store from "./store/index";
export default {
  components: {
    Navbar,
  },
  setup() {
    const appReady = ref(null);

    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) appReady.value = true;
    };
    fetchUser();

    // if (!user) appReady.value = true;

    supabase.auth.onAuthStateChange((event, session) => {
      store.methods.setUser(session);
      appReady.value = true;
    });

    return { appReady };
  },
};
</script>

<style lang="scss" scoped></style>

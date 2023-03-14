<template>
  <header class="bg-green-500 text-white">
    <nav
      class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row"
    >
      <div class="flex items-center gap-x-0">
        <h1 class="text-lg">Active tracker</h1>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link class="cursor-pointer" :to="{ name: 'Home' }"
          >Home</router-link
        >
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'Create' }"
          >Create</router-link
        >
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Login' }"
          >Login</router-link
        >
        <li v-if="user" class="cursor-pointer" @click="logout">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import store from "../store";
import { computed } from "vue";
import { supabase } from "../supabase/supabaseClient";
import { useRouter } from "vue-router";
export default {
  setup() {
    const user = computed(() => store.state.user);

    const router = useRouter();

    const logout = async () => {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push({ name: "Home" });
    };
    return { logout, user };
  },
};
</script>

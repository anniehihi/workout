<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error -->
    <div v-if="errMsg" class="mb-10 p-4 rounded-md bg-gray-200">
      <p class="text-red-500">{{ errMsg }}</p>
    </div>

    <!-- Register -->
    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-gray-200 rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-green-500 mb-4">Login</h1>
      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-green-500">Email</label>
        <input
          type="email"
          required
          class="p-2 text-gray-700 focus:outline-none rounded-md"
          v-model="email"
          id="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-green-500"
          >Password</label
        >
        <input
          type="password"
          required
          class="p-2 text-gray-700 focus:outline-none rounded-md"
          v-model="password"
          id="password"
        />
      </div>

      <button
        type="submit"
        class="py-2 px-6 bg-green-500 rounded-md mt-6 self-start text-sm text-white duration-200 border-solid border-2 border-transparent hover:border-green-500 hover:bg-white hover:text-green-500"
      >
        Login
      </button>

      <router-link :to="{ name: 'Register' }" class="text-sm mt-6 text-center"
        >Don't have an account!
        <span class="text-green-500">Register</span></router-link
      >
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase/supabaseClient";
import { useRouter } from "vue-router";
// console.log(ref);
export default {
  name: "Login",
  setup() {
    // Data
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const errMsg = ref(null);

    const login = async () => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push({ name: "Home" });
      } catch (error) {
        errMsg.value = `${error.message}`;
        setTimeout(() => {
          errMsg.value = null;
        }, 5000);
      }
    };

    return { email, password, errMsg, login };
  },
};
</script>

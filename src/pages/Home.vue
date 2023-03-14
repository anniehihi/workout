<template>
  <div v-if="dataLoaded" class="container mt-10 px-4">
    <!-- No Data -->
    <div v-if="data.length === 0" class="w-full flex flex-col items-center">
      <h1 class="text-2xl">Looks empty here...</h1>
      <router-link
        class="mt-6 py-2 px-6 rounded-sm text-sm text-white bg-green-500 duration-200 border-solid border-2 border-transparent hover:border-green-500 hover:bg-white hover:text-green-500"
        :to="{ name: 'Create' }"
        >Create Workout</router-link
      >
    </div>

    <!-- Data -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <router-link
        class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
        :to="/view-workout/ + workout.id"
        v-for="(workout, index) in data"
        :key="index"
      >
        <!-- Cardio Img -->
        <img
          v-if="workout.workoutType === 'cardio'"
          src="../assets/images/running-light-green.png"
          class="h-24 w-auto"
          alt=""
        />

        <!-- Strength Training -->
        <img
          v-else
          src="../assets/images/dumbbell-light-green.png"
          class="h-24 w-auto"
          alt=""
        />

        <p
          class="mt-6 py-1 px-3 text-xs text-white bg-green-500 shadow-md rounded-lg"
        >
          {{ workout.workoutType }}
        </p>

        <h1 class="mt-8 mb-2 text-center text-xl text-green-500">
          {{ workout.workoutName }}
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase/supabaseClient";
import { ref } from "vue";
export default {
  name: "Home",
  components: {},
  setup() {
    const data = ref([]);
    const dataLoaded = ref(null);

    const getData = async () => {
      try {
        let { data: workouts, error } = await supabase
          .from("workouts")
          .select("*");
        if (error) throw error;
        data.value = workouts;
        dataLoaded.value = true;
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();

    return { data, dataLoaded };
  },
};
</script>

<style lang="scss" scoped></style>

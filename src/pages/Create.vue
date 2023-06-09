<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- Status Message -->
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 bg-gray-200 rounded-md shadow-lg"
    >
      <p class="text-green-500">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Create -->
    <div class="p-8 flex items-start bg-gray-200 rounded-md shadow-lg">
      <!-- Form -->
      <form
        @submit.prevent="createWorkout"
        class="flex flex-col gap-y-5 w-full"
      >
        <h1 class="text-2xl text-green-500">Record Workout</h1>

        <!-- Workout Name -->
        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-green-500"
            >Workout Name</label
          >
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="workout-name"
            v-model="workoutName"
          />
        </div>

        <!-- Workout Type -->
        <div class="flex flex-col">
          <label for="workout-type" class="mb-1 text-sm text-green-500"
            >Workout Type</label
          >
          <select
            id="workout-type"
            class="p-2 text-gray-500 focus:outline-none"
            required
            @change="workoutChange"
            v-model="workoutType"
          >
            <option value="select-workout">Select Workout</option>
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        <!-- Strength Training Inputs -->
        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
            v-for="(item, index) in exercises"
            :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-green-500"
                >Exercise
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.exercise"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-green-500"
                >Sets
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.sets"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-green-500"
                >Reps
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.reps"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-green-500"
                >Weight (LB's)
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.weight"
              />
            </div>
            <img
              @click="deleteExercise(item.id)"
              src="../assets/images/trash-light-green.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer"
              alt=""
            />
          </div>
          <button
            @click="addExercise"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-green-500 duration-200 border-solid border-2 border-transparent hover:border-green-500 hover:bg-white hover:text-green-500"
          >
            Add Exercise
          </button>
        </div>

        <!-- Cardio Inputs -->
        <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
            v-for="(item, index) in exercises"
            :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-green-500"
                >Type
              </label>
              <select
                id="cardio-type"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.cardioType"
              >
                <option value="#">Select Type</option>
                <option value="run">Runs</option>
                <option value="walk">Walk</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-green-500"
                >Distance
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.distance"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-green-500"
                >Duration
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.duration"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-green-500"
                >Pace
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.pace"
              />
            </div>
            <img
              @click="deleteExercise(item.id)"
              src="../assets/images/trash-light-green.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer"
              alt=""
            />
          </div>
          <button
            @click="addExercise"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-green-500 duration-200 border-solid border-2 border-transparent hover:border-green-500 hover:bg-white hover:text-green-500"
          >
            Add Exercise
          </button>
        </div>

        <button
          type="submit"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-green-500 duration-200 border-solid border-2 border-transparent hover:border-green-500 hover:bg-white hover:text-green-500"
        >
          Record Workout
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { uid } from "uid";
import { supabase } from "../supabase/supabaseClient";
export default {
  name: "create",
  setup() {
    const workoutName = ref("");
    const workoutType = ref("select-workout");
    const exercises = ref([]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);

    const addExercise = () => {
      if (workoutType.value === "strength") {
        exercises.value.push({
          id: uid(),
          exercise: "",
          sets: "",
          reps: "",
          weight: "",
        });
        return;
      }
      exercises.value.push({
        id: uid(),
        cardioType: "",
        distance: "",
        duration: "",
        pace: "",
      });
    };

    const deleteExercise = (id) => {
      if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter(
          (exercise) => exercise.id !== id
        );
        return;
      }
      errorMsg.value = "Cannot remove, need to at least have one exercise";
      setTimeout(() => {
        errorMsg.value = false;
      }, 5000);
    };

    const workoutChange = () => {
      exercises.value = [];
      addExercise();
    };

    const createWorkout = async () => {
      try {
        const { error } = await supabase.from("workouts").insert([
          {
            workoutName: workoutName.value,
            workoutType: workoutType.value,
            exercises: exercises.value,
          },
        ]);
        if (error) throw error;
        statusMsg.value = "Workout Created!";
        workoutName.value = null;
        workoutType.value = "select-workout";
        exercises.value = [];
        setTimeout(() => {
          statusMsg.value = false;
        }, 5000);
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };

    return {
      workoutName,
      workoutType,
      exercises,
      statusMsg,
      errorMsg,
      addExercise,
      workoutChange,
      deleteExercise,
      createWorkout,
    };
  },
};
</script>

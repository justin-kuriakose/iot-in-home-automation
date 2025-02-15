<template>
  <div class="bg-white mr-4 pb-8 ">
    <h2 class="text-4xl text-black mr-60 mb-10 text-left ml-5">Room Controls</h2>

    <div class="space-y-6">
      <!-- Fan Control -->
      <div class="flex justify-between bg-sky-100 p-3 mx-60 ml-4 mr-1 pl-10 pr-10 rounded-lg border border-black shadow-md shadow-xl transition-all">
        <p class="text-2xl font-medium text-black">Fan</p>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" :checked="fanState" @change="toggleFan">
          <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-sky-800 dark:bg-gray-700 peer-checked:bg-green-600 transition-all"></div>
          <span class="ml-3 text-2xl font-medium text-gray-900">
            {{ fanState ? 'ON' : 'OFF' }}
          </span>
        </label>
      </div>

      <!-- Light Control -->
      <div class="flex justify-between mx-60 bg-sky-100 p-3 pl-10 pr-10 ml-5 mr-1 rounded-lg border border-black shadow-xl transition-all">
        <p class="text-2xl font-medium text-black">Light</p>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" :checked="lightState" @change="toggleLight">
          <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-sky-800 dark:bg-gray-700 peer-checked:bg-green-600 transition-all"></div>
          <span class="ml-3 text-2xl font-medium text-gray-900">
            {{ lightState ? 'ON' : 'OFF' }}
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { database } from "../config"; // Import Firebase database
import { get, set } from "firebase/database";
import { ref as dbRef } from "firebase/database";

export default {
  setup() {
    // State variables
    const fanState = ref(false);
    const lightState = ref(false);

    // Function to fetch initial states
    const fetchStates = async () => {
      try {
        const fanSnapshot = await get(dbRef(database, "/roomControls/fan"));
        const lightSnapshot = await get(dbRef(database, "/roomControls/light"));

        if (fanSnapshot.exists()) {
          fanState.value = fanSnapshot.val();
        }

        if (lightSnapshot.exists()) {
          lightState.value = lightSnapshot.val();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Function to toggle Fan
    const toggleFan = async () => {
      fanState.value = !fanState.value;
      try {
        await set(dbRef(database, "/roomControls/fan"), fanState.value);
      } catch (error) {
        console.error("Error updating Fan state:", error);
      }
    };

    // Function to toggle Light
    const toggleLight = async () => {
      lightState.value = !lightState.value;
      try {
        await set(dbRef(database, "/roomControls/light"), lightState.value);
      } catch (error) {
        console.error("Error updating Light state:", error);
      }
    };

    // Fetch data when component loads
    onMounted(fetchStates);

    return {
      fanState,
      lightState,
      toggleFan,
      toggleLight,
    };
  },
};
</script>


      


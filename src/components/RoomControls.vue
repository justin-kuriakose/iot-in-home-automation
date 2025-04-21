<template>
  <div class="bg-white mr-4 pb-8">
    <h2 class="text-4xl text-black mr-60 mb-10 text-left ml-5">Room Controls</h2>

    <div class="space-y-6">
      <!-- Fan Control -->
      <div class="flex flex-col bg-sky-100 p-3 mx-60 ml-4 mr-1 pl-10 pr-10 rounded-lg border border-black shadow-md shadow-xl transition-all">
        <div class="flex justify-between">
          <p class="text-2xl font-medium text-black">Fan</p>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" :checked="fanState" @change="toggleFan">
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-sky-800 dark:bg-gray-700 peer-checked:bg-green-600 transition-all"></div>
            <span class="ml-3 text-2xl font-medium text-gray-900">
              {{ fanState ? 'ON' : 'OFF' }}
            </span>
          </label>
        </div>

        <!-- Fan Timer -->
        <div class="mt-3">
          <label class="block text-sm font-medium text-gray-700">Turn ON Time</label>
          <input type="time" v-model="fanOnTime" class="mt-1 block w-full p-2 border rounded" />

          <label class="block mt-2 text-sm font-medium text-gray-700">Turn OFF Time</label>
          <input type="time" v-model="fanOffTime" class="mt-1 block w-full p-2 border rounded" />

          <button class="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" @click="setFanTimer">
            Set Fan Timer
          </button>
        </div>
      </div>

      <!-- Light Control -->
      <div class="flex flex-col mx-60 bg-sky-100 p-3 pl-10 pr-10 ml-5 mr-1 rounded-lg border border-black shadow-xl transition-all">
        <div class="flex justify-between">
          <p class="text-2xl font-medium text-black">Light</p>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" :checked="lightState" @change="toggleLight">
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-sky-800 dark:bg-gray-700 peer-checked:bg-green-600 transition-all"></div>
            <span class="ml-3 text-2xl font-medium text-gray-900">
              {{ lightState ? 'ON' : 'OFF' }}
            </span>
          </label>
        </div>

        <!-- Light Timer -->
        <div class="mt-3">
          <label class="block text-sm font-medium text-gray-700">Turn ON Time</label>
          <input type="time" v-model="lightOnTime" class="mt-1 block w-full p-2 border rounded" />

          <label class="block mt-2 text-sm font-medium text-gray-700">Turn OFF Time</label>
          <input type="time" v-model="lightOffTime" class="mt-1 block w-full p-2 border rounded" />

          <button class="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" @click="setLightTimer">
            Set Light Timer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { database } from "../config"; // Firebase Configuration
import { get, set } from "firebase/database";
import { ref as dbRef } from "firebase/database";

export default {
  setup() {
    // Device States
    const fanState = ref(false);
    const lightState = ref(false);

    // Timer States
    const fanOnTime = ref("");
    const fanOffTime = ref("");
    const lightOnTime = ref("");
    const lightOffTime = ref("");

    // Fetch Stored States & Timers from Firebase
    const fetchStates = async () => {
      try {
        const fanSnapshot = await get(dbRef(database, "/roomControls/fan"));
        const lightSnapshot = await get(dbRef(database, "/roomControls/light"));
        const fanTimerSnapshot = await get(dbRef(database, "/roomControls/fanTimer"));
        const lightTimerSnapshot = await get(dbRef(database, "/roomControls/lightTimer"));

        if (fanSnapshot.exists()) fanState.value = fanSnapshot.val();
        if (lightSnapshot.exists()) lightState.value = lightSnapshot.val();

        if (fanTimerSnapshot.exists()) {
          const { onTime, offTime } = fanTimerSnapshot.val();
          fanOnTime.value = onTime;
          fanOffTime.value = offTime;
        }

        if (lightTimerSnapshot.exists()) {
          const { onTime, offTime } = lightTimerSnapshot.val();
          lightOnTime.value = onTime;
          lightOffTime.value = offTime;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Toggle Fan Manually
    const toggleFan = async () => {
      fanState.value = !fanState.value;
      await set(dbRef(database, "/roomControls/fan"), fanState.value);
      await set(dbRef(database, "/roomControls/fanManualControl"), true);
    };

    // Toggle Light Manually
    const toggleLight = async () => {
      lightState.value = !lightState.value;
      await set(dbRef(database, "/roomControls/light"), lightState.value);
      await set(dbRef(database, "/roomControls/lightManualControl"), true);
    };

    // Set Fan Timer
    // Set Fan Timer
const setFanTimer = async () => {
  if (fanOnTime.value && fanOffTime.value) {
    await set(dbRef(database, "/roomControls/fanTimer"), {
      onTime: fanOnTime.value,
      offTime: fanOffTime.value,
    });
    await set(dbRef(database, "/roomControls/fanManualControl"), false);
    alert("Fan timer set successfully!");
  } else {
    alert("Please set both ON and OFF times for the fan.");
  }
};

// Set Light Timer
const setLightTimer = async () => {
  if (lightOnTime.value && lightOffTime.value) {
    await set(dbRef(database, "/roomControls/lightTimer"), {
      onTime: lightOnTime.value,
      offTime: lightOffTime.value,
    });
    await set(dbRef(database, "/roomControls/lightManualControl"), false);
    alert("Light timer set successfully!");
  } else {
    alert("Please set both ON and OFF times for the light.");
  }
};


    // Check and Apply Timers Every Second
    const checkTimers = async () => {
      const now = new Date();
      const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

      const fanTimerSnapshot = await get(dbRef(database, "/roomControls/fanTimer"));
      const fanManualControlSnapshot = await get(dbRef(database, "/roomControls/fanManualControl"));
      const lightTimerSnapshot = await get(dbRef(database, "/roomControls/lightTimer"));
      const lightManualControlSnapshot = await get(dbRef(database, "/roomControls/lightManualControl"));

      const fanManualControl = fanManualControlSnapshot.exists() ? fanManualControlSnapshot.val() : false;
      const lightManualControl = lightManualControlSnapshot.exists() ? lightManualControlSnapshot.val() : false;

      if (!fanManualControl && fanTimerSnapshot.exists()) {
        const { onTime, offTime } = fanTimerSnapshot.val();
        fanState.value = currentTime >= onTime && currentTime < offTime;
        await set(dbRef(database, "/roomControls/fan"), fanState.value);
      }

      if (!lightManualControl && lightTimerSnapshot.exists()) {
        const { onTime, offTime } = lightTimerSnapshot.val();
        lightState.value = currentTime >= onTime && currentTime < offTime;
        await set(dbRef(database, "/roomControls/light"), lightState.value);
      }
    };

    onMounted(() => {
      fetchStates();
      setInterval(checkTimers, 1000);
    });

    return { fanState, lightState, fanOnTime, fanOffTime, lightOnTime, lightOffTime, toggleFan, toggleLight, setFanTimer, setLightTimer };
  }
};
</script>

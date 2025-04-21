<template>
  <div class="flex justify-between items-center mr-5">
    <div></div>
    <button
      class="w-36 h-10 justify-end bg-black hover:bg-slate-800 rounded-lg border border-black text-center text-white"
      @click="fetchData"
    >
      <h6 class="text-center text-white">Refresh Data</h6>
    </button>
  </div>

  <div class="bg-white ml-4 pl-2 rounded-lg">
    <div class="grid grid-cols-2 gap-4 text-center">
      <!-- Temperature Section -->
      <div class="p-4 bg-sky-100 rounded-lg border border-black shadow-md">
        <p class="text-sm text-black uppercase tracking-wide font-medium">Temperature</p>
        <p class="text-4xl font-extrabold text-black">{{ temperature }} °C</p>
        <canvas ref="temperatureChart"></canvas>
        <div class="pt-5 text-blue-600 text-sm font-semibold cursor-pointer">
          Temperature Report →
        </div>
      </div>

      <!-- Humidity Section -->
      <div class="p-4 bg-sky-100 rounded-lg border border-black shadow-md">
        <p class="text-sm text-black uppercase tracking-wide font-medium">Humidity</p>
        <p class="text-4xl font-extrabold text-black">{{ humidity }} %</p>
        <canvas ref="humidityChart"></canvas>
        <div class="pt-5 text-blue-600 text-sm font-semibold cursor-pointer">
          Humidity Report →
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import { get } from "firebase/database";
import { ref as dbRef } from "firebase/database";
import { database } from "../config"; 
import Chart from "chart.js/auto";

export default {
  setup() {
    const temperature = ref(0);
    const humidity = ref(0);
    const temperatureChart = ref(null);
    const humidityChart = ref(null);
    let tempChartInstance = null;
    let humChartInstance = null;

    // Fetch Data from Firebase
    const fetchData = async () => {
      try {
        const tempSnapshot = await get(dbRef(database, "/sensorData/temperature"));
        const humSnapshot = await get(dbRef(database, "/sensorData/humidity"));

        if (tempSnapshot.exists() && humSnapshot.exists()) {
          // Update displayed values
          temperature.value = tempSnapshot.val();
          humidity.value = humSnapshot.val();

          // Ensure DOM updates before drawing charts
          await nextTick();
          updateCharts();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Update Charts
    const updateCharts = () => {
      if (!temperatureChart.value || !humidityChart.value) return;

      // Destroy existing charts before creating new ones
      if (tempChartInstance) tempChartInstance.destroy();
      if (humChartInstance) humChartInstance.destroy();

      // Create Temperature Chart
      tempChartInstance = new Chart(temperatureChart.value.getContext("2d"), {
        type: "line",
        data: {
          labels: ["Now"],
          datasets: [
            {
              label: "Temperature (°C)",
              data: [temperature.value],
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            },
          ],
        },
      });

      // Create Humidity Chart
      humChartInstance = new Chart(humidityChart.value.getContext("2d"), {
        type: "line",
        data: {
          labels: ["Now"],
          datasets: [
            {
              label: "Humidity (%)",
              data: [humidity.value],
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.2)",
            },
          ],
        },
      });
    };

    onMounted(fetchData);

    return {
      fetchData,
      temperature,
      humidity,
      temperatureChart,
      humidityChart,
    };
  },
};
</script>


  
  <template>
  <div class="flex justify-between items-center mr-5">
            <div></div>
  <button class="w-36 h-10 justify-end bg-black  hover:bg-slate-800 rounded-lg border border-black text-center text-white"
  @click="fetchData">
    <h6 class="text-center text-white">Refresh Data</h6>
  </button>
          </div>

  <div class="bg-white ml-4 pl-2 rounded-lg">
    <!-- Main Content Grid -->

    <div class="grid grid-cols-2 gap-4 text-center">

      <!-- Temperature Section -->
      <div class="p-4 bg-sky-100 rounded-lg border border-black shadow-md">
        <p class="text-sm text-black uppercase tracking-wide font-medium">temp</p>
        <p class="text-4xl font-extrabold text-black"> {{ temperature }} °C</p>
        <div id="humidity-chart" class="mt-4">
          <canvas ref="humidityChart"></canvas>
        </div>
        <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
          <div class="flex justify-between items-center pt-5">
            <button id="dropdownDefaultButton" data-dropdown-toggle="lastDaysdropdown" data-dropdown-placement="bottom"
              class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
              type="button">
              Last 7 days
              <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <a href="#"
              class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
              Humidity Report
              <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 9 4-4-4-4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Humidity Section -->
      <div class="p-4 bg-sky-100 rounded-lg border border-black shadow-md mr-5">
        <p class="text-sm text-black uppercase tracking-wide font-medium">Humidity</p>
        <p class="text-4xl font-extrabold text-black">{{ humidity }} %</p>
        <div id="humidity-chart" class="mt-4">
          <canvas ref="humidityChart"></canvas>
        </div>
        <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
          <div class="flex justify-between items-center pt-5">
            <button id="dropdownDefaultButton" data-dropdown-toggle="lastDaysdropdown" data-dropdown-placement="bottom"
              class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
              type="button">
              Last 7 days
              <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <a href="#"
              class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
              Humidity Report
              <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 9 4-4-4-4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

    </div>



    <!-- Error Message -->
    <div class="mt-4 mb-3 text-sm text-red-700 text-center"></div>
  </div>
</template>


<script>
import { ref, onMounted } from "vue";
import { database } from "../config";
import { get, ref as dbRef } from "firebase/database";

export default {
  setup() {
    const temperature = ref("...");
    const humidity = ref("...");
    const errorMessage = ref("");

    const fetchData = async () => {
      try {
        const tempSnapshot = await get(dbRef(database, "sensorData/temperature"));
        if (tempSnapshot.exists()) {
          temperature.value = tempSnapshot.val();
        } else {
          temperature.value = "N/A";
        }

        
        const humiditySnapshot = await get(dbRef(database, "sensorData/humidity"));
        if (humiditySnapshot.exists()) {
          humidity.value = humiditySnapshot.val();
        } else {
          humidity.value = "N/A";
        }

        errorMessage.value = ""; // Clear error message on successful fetch
      } catch (error) {
        console.error("Error fetching data:", error);
        errorMessage.value = "Failed to fetch data. Please try again.";
      }
    };

    // Fetch data when component is mounted
    onMounted(fetchData);

    return {
      temperature,
      humidity,
      fetchData,
      errorMessage,
    };
  },
};
</script>








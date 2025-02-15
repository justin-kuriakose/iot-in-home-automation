<template>

    <h1 class="text-5xl font-mid text-black justify-start text-center p-10">Smart Home Dashboard</h1>

    <div class="grid grid-cols-1 gap-4">
      
      <RoomTemperature/>
      <RoomControls/>

    </div>
  </template>
  
    
<script>
import RoomTemperature from "../components/RoomTemperature.vue";
import RoomControls from "../components/RoomControls.vue";

export default {
  components: {
    RoomTemperature,
    RoomControls,
  },
};
</script>




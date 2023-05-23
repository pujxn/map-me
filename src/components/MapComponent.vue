<template>
    <div id="container">
        <div id="mapContainer"></div>
    </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L, { map } from "leaflet";
import { onMounted, onUpdated, ref } from "vue";

const props = defineProps(["latitude", "longitude"]);
const myMap = ref();
const marker = ref();
const tooltip = ref();

const setupMap = (myMap) => {
    myMap.value = L.map("mapContainer", { zoomAnimation: false, scrollWheelZoom: false }).setView([props.latitude, props.longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(myMap.value);
    marker.value = L.marker([props.latitude, props.longitude]);
    marker.value.addTo(myMap.value);
    tooltip.value = L.tooltip();
    tooltip.value.setContent(`${props.latitude}, ${props.longitude}`)
    marker.value.bindTooltip(tooltip.value);
}


onMounted(() => {
    console.log("Mounted");
    setupMap(myMap);
})


onUpdated(() => {
    console.log("Updated");
    myMap.value.panTo([props.latitude, props.longitude]);
    marker.value.setLatLng([props.latitude, props.longitude]);
    tooltip.value.setContent(`${props.latitude}, ${props.longitude}`)
})

</script>

<style scoped>
#mapContainer {
    height: 500px;
}
</style>
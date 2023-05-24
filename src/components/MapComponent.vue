<template>
    <div id="container" class="h-full">
        <div id="mapContainer" class="h-full"></div>
    </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L, { map } from "leaflet";
import { onMounted, onUpdated, ref } from "vue";
import "@sjaakp/leaflet-search/dist/leaflet-search"

const props = defineProps(["latitude", "longitude", "placeName", "placeDesc"]);
const myMap = ref();
const marker = ref();
const tooltip = ref();
const searchControl = ref();

const generateTooltipText = () => {
    return `Lat, Lng: ${props.latitude}, ${props.longitude}<br />
    Name: ${props.placeName}<br />
    Desc: ${props.placeDesc}`
}


const setupMap = (myMap, marker, tooltip, searchControl) => {

    myMap.value = L.map("mapContainer").setView([props.latitude, props.longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(myMap.value);

    marker.value = L.marker([props.latitude, props.longitude]);
    marker.value.addTo(myMap.value);

    tooltip.value = L.tooltip();
    tooltip.value.setContent(generateTooltipText());

    marker.value.bindTooltip(tooltip.value);
    marker.value.on("mouseover", function (e) { (tooltip.value.close()) })

    searchControl.value = L.control.search();
    searchControl.value.addTo(myMap.value);
}


const updateMap = (myMap, marker, tooltip) => {
    myMap.value.panTo([props.latitude, props.longitude]);
    marker.value.setLatLng([props.latitude, props.longitude]);
    tooltip.value.setContent(generateTooltipText());
}


onMounted(() => {
    console.log("Mounted");
    setupMap(myMap, marker, tooltip, searchControl);
})


onUpdated(() => {
    console.log("Updated");
    updateMap(myMap, marker, tooltip);

})

</script>

<!-- <style scoped>
#mapContainer {
    height: 500px;
}
</style> -->
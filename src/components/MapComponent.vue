<template>
    <div id="container" class="h-full">
        <div id="mapContainer" class="h-full"></div>
    </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L, { map, icon } from "leaflet";
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

    // delete L.Icon.Default.prototype._getIconUrl;

    // L.Icon.Default.mergeOptions({
    //     iconUrl: markerImg,
    //     shadowUrl: markerImg2
    // });


    myMap.value = L.map("mapContainer").setView([51.05, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(myMap.value);

    // const newIcon = L.Icon({ iconUrl: "data:image/jpeg;base64,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" })

    marker.value = L.marker([51.05, -0.09]);
    marker.value.addTo(myMap.value);

    tooltip.value = L.tooltip();
    tooltip.value.setContent(`Lat, Lng: 51.05, -0.09<br />
    Name: London<br />
    Desc: A beautiful city in England`);

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
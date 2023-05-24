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

// const ICON = icon({
//     iconURL: "@/assets/marker-icon.png",
//     iconSize: [32, 32]
// })


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

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: ('src/assets/marker-icon-2x.png'),
        iconUrl: ('src/assets/marker-icon.png'),
        shadowUrl: ('src/assets/marker-shadow.png')
    });


    myMap.value = L.map("mapContainer").setView([51.05, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(myMap.value);

    marker.value = L.marker([51.05, -0.09], { iconURL: "@/assets/marker-icon.png" });
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
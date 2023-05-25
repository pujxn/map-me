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


    const greenIcon = L.icon({
        // iconUrl: 'https://w7.pngwing.com/pngs/731/25/png-transparent-location-icon-computer-icons-google-map-maker-marker-pen-cartodb-map-marker-heart-logo-color.png',
        // shadowUrl: 'leaf-shadow.png',

        iconUrl: "src/marker-icon.png",
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });




    myMap.value = L.map("mapContainer").setView([51.05, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(myMap.value);

    marker.value = L.marker([51.05, -0.09], { icon: greenIcon });
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
    setupMap(myMap, marker, tooltip, searchControl);
})


onUpdated(() => {
    updateMap(myMap, marker, tooltip);
})

</script>

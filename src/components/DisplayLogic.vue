<template>
    <FormComponent :latitude="latitude" :longitude="longitude" :placeName="placeName" :placeDesc="placeDesc" @formChanged="(newVal) => {
        latitude = newVal[0];
        longitude = newVal[1];
        placeName = newVal[2];
        placeDesc = newVal[3];
    }" />
    <MapComponent :latitude="latitude" :longitude="longitude" :placeName="placeName" :placeDesc="placeDesc" />
</template>

<script setup>
import FormComponent from "@/components/FormComponent.vue"
import MapComponent from "@/components/MapComponent.vue"
import { ref } from "vue"
const latitude = ref(51.05);
const longitude = ref(-0.09);
const placeName = ref("My favorite place");
const placeDesc = ref("About my favorite place");
</script>

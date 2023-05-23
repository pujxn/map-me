<template>
    <FormComponent :latitude="latitude" :longitude="longitude" @coordinatesChanged="(newVal) => {
        latitude = newVal[0];
        longitude = newVal[1];
    }" />
    <MapComponent :latitude="latitude" :longitude="longitude" />
</template>

<script setup>
import FormComponent from "@/components/FormComponent.vue"
import MapComponent from "@/components/MapComponent.vue"
import { ref } from "vue"
const latitude = ref(51.05);
const longitude = ref(-0.09);
</script>

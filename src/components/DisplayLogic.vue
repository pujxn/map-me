<template>
    <div class="flex flex-col h-screen">
        <div class="h-1/2">
            <MapComponent :latitude="latitude" :longitude="longitude" :placeName="placeName" :placeDesc="placeDesc" />
        </div>
        <div class="h-1/2">
            <FormComponent :latitude="latitude" :longitude="longitude" :placeName="placeName" :placeDesc="placeDesc"
                @formChanged="(newVal) => {
                    latitude = newVal[0];
                    longitude = newVal[1];
                    placeName = newVal[2];
                    placeDesc = newVal[3];
                }" />
        </div>
    </div>
</template>

<script setup>
import FormComponent from "@/components/FormComponent.vue"
import MapComponent from "@/components/MapComponent.vue"
import { ref } from "vue"

const latitude = ref();
const longitude = ref();
const placeName = ref();
const placeDesc = ref();
</script>

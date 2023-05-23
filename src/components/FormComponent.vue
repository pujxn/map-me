<script setup>
import { ref } from "vue";
const props = defineProps(["latitude", "longitude", "placeName", "placeDesc"]);
const latVal = ref(props.latitude);
const longVal = ref(props.longitude);
const placeNameVal = ref(props.placeName);
const placeDescVal = ref(props.placeDesc); 
</script>

<template>
    <input v-model.lazy="latVal" />
    <input v-model.lazy="longVal" />
    <input v-model.lazy="placeNameVal" />
    <input v-model.lazy="placeDescVal" />
    <button @click="$emit('formChanged', [latVal, longVal, placeNameVal, placeDescVal])">Click</button>
    <h2>{{ latitude }}</h2>
    <h2>{{ longitude }}</h2>
</template>

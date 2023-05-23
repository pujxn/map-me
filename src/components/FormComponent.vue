<script setup>
import { ref } from "vue";
const props = defineProps(["latitude", "longitude"]);
const latVal = ref(props.latitude);
const longVal = ref(props.longitude);
</script>

<template>
    <input v-model.lazy="latVal" />
    <input v-model.lazy="longVal" />
    <button @click="$emit('coordinatesChanged', [latVal, longVal])">Click</button>
    <h2>{{ latitude }}</h2>
    <h2>{{ longitude }}</h2>
</template>

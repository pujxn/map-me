<template>
    <input v-model.lazy="latitude" />
    <input v-model.lazy="longitude" />
</template>


<script setup>
import { onUpdated, ref } from "vue"
const latitude = ref("");
const longitude = ref("");

onUpdated(() => {
    console.log(latitude.value, longitude.value);
})
</script>

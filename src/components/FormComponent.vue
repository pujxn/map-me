<script setup>
import { ref } from "vue";
const props = defineProps(["latitude", "longitude", "placeName", "placeDesc"]);
const latVal = ref(props.latitude);
const longVal = ref(props.longitude);
const placeNameVal = ref(props.placeName);
const placeDescVal = ref(props.placeDesc);

const isLatError = () => {
    if (latVal.value >= -90 && latVal.value <= 90 && typeof latVal.value != "string") {
        return false;
    }
    else {
        return true;
    }
}

const isLongError = () => {

    if (longVal.value >= -180 && longVal.value < 180 && typeof longVal.value != "string") {
        return false;
    }
    else {
        return true;
    }
}


</script>

<template>
    <form id="userForm">
        <input v-model.number="latVal" @change="isLatError" />
        <span v-if="isLatError()">Latitude values can only be a number
            between -90
            and 90</span>
        <input v-model.number="longVal" />
        <span v-if="isLongError()">Longitude values can only be between -180 and 179.99</span>
        <input v-model.lazy="placeNameVal" />
        <input v-model.lazy="placeDescVal" />
        <button :disabled="isLatError() || isLongError()" @click="e => {
            e.preventDefault();
            $emit('formChanged', [latVal.toFixed(2), longVal.toFixed(2), placeNameVal, placeDescVal])
        }">
            Click
        </button>
    </form>

    <h2>{{ latitude }}</h2>
    <h2>{{ longitude }}</h2>
</template>

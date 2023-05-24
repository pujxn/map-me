<script setup>
import { ref } from "vue";
const props = defineProps(["latitude", "longitude", "placeName", "placeDesc"]);
const latVal = ref(props.latitude);
const longVal = ref(props.longitude);
const placeNameVal = ref(props.placeName);
const placeDescVal = ref(props.placeDesc);

const isLatError = () => {
    if (latVal.value >= -90 && latVal.value <= 90 && typeof latVal.value != "string") { //Takes care that the field is not empty and within permissible latitude bounds
        return false;
    }
    else {
        return true;
    }
}

const isLongError = () => {

    if (longVal.value >= -180 && longVal.value < 180 && typeof longVal.value != "string") { //Takes care that the field is not empty and within permissible longitude bounds
        return false;
    }
    else {
        return true;
    }
}


</script>

<template>
    <div class="h-full flex flex-col items-center justify-center">
        <div>
            <form id="userForm" class="flex flex-col space-y-2 border-4 border-red-400 p-4">
                <label class="text-light-orange font-bold">Latitude:<br /><input class="text-black font-normal"
                        v-model.number="latVal" /></label>
                <span class="material-icons">error</span><span v-if="isLatError()">Latitude must be a number between -90 and
                    90</span>
                <label class="text-light-orange font-bold">Longitude:<br /><input class="text-black font-normal"
                        v-model.number="longVal" /></label>
                <span class="text-red-400" v-if="isLongError()">Longitude must be a number between -180 and 179.99</span>
                <label class="text-light-orange font-bold">Place name:<br /><input class="text-black font-normal"
                        v-model.lazy="placeNameVal" /></label>
                <label class="text-light-orange font-bold">Place description:<br /><input class="text-black font-normal"
                        v-model.lazy="placeDescVal" /></label>
            </form>
        </div>
        <div>
            <button class="bg-red-400" :disabled="isLatError() || isLongError()" @click="e => {
                e.preventDefault();
                $emit('formChanged', [latVal.toFixed(2), longVal.toFixed(2), placeNameVal, placeDescVal])
            }">
                Click
            </button>
        </div>

        <h2 class="text-red-600">{{ latitude }}</h2>
        <h2>{{ longitude }}</h2>
    </div>
</template>

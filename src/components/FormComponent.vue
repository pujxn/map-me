<script setup>
import { ref } from "vue";
const props = defineProps(["latitude", "longitude", "placeName", "placeDesc"]);
const latVal = ref(props.latitude);
const longVal = ref(props.longitude);
const placeNameVal = ref(props.placeName);
const placeDescVal = ref(props.placeDesc);

const isLatError = () => {
    if (latVal.value >= -90 && latVal.value <= 90 && typeof latVal.value != "string") { //Takes care that the field is within permissible latitude bounds
        return false;
    }
    else {
        return true;
    }
}

const isLongError = () => {

    if (longVal.value >= -180 && longVal.value < 180 && typeof longVal.value != "string") { //Takes care that the field is within permissible longitude bounds
        return false;
    }
    else {
        return true;
    }
}

const allFieldsFilled = () => {
    if (placeNameVal.value && placeDescVal.value) {
        return true;
    }
    else {
        return false;
    }
}


</script>

<template>
    <div class="mt-8 flex flex-col items-center justify-center">
        <div class="w-80">
            <form id="userForm" class="flex flex-col space-y-2 border-4 border-light-orange p-4">
                <label class="text-light-orange font-bold"><span class="text-red-400">* </span>Latitude:<br /><input
                        class="text-black font-normal w-full" v-model.number="latVal"
                        placeholder="Enter Latitude" /></label>
                <div v-if="isLatError()" class="text-red-400 text-sm">
                    <span class="material-icons inline-block align-middle">error</span><span>Latitude must be a number
                        between -90
                        and 90</span>
                </div>

                <label class="text-light-orange font-bold"><span class="text-red-400">* </span>Longitude:<br /><input
                        class="text-black font-normal w-full" v-model.number="longVal"
                        placeholder="Enter Longitude" /></label>
                <div v-if="isLongError()" class="text-red-400 text-sm">
                    <span class="material-icons inline-block align-middle">error</span><span class="text-red-400">Longitude
                        must be a number between -180 and 179.99</span>
                </div>
                <label class="text-light-orange font-bold"><span class="text-red-400">* </span>Place name:<br /><input
                        class="text-black font-normal w-full" v-model="placeNameVal" required
                        placeholder="Enter Name" /></label>
                <label class="text-light-orange font-bold"><span class="text-red-400">* </span>Place
                    description:<br /><input class="text-black font-normal w-full" v-model="placeDescVal" required
                        placeholder="Enter description" /></label>
            </form>
        </div>
        <div class="mt-4 w-content border-4 border-light-orange drop-shadow-sm">
            <button
                class="font-semibold disabled:bg-light-grey disabled:text-deep-purple w-32 bg-deep-purple hover:bg-light-orange text-light-orange hover:text-deep-purple"
                :disabled="isLatError() || isLongError() || !allFieldsFilled()" @click="e => {
                    e.preventDefault();
                    $emit('formChanged', [latVal.toFixed(2), longVal.toFixed(2), placeNameVal, placeDescVal])
                }" form="userForm" type="submit">
                Let's travel!
            </button>
        </div>
    </div>
</template>

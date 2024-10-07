<template>
    <div>
        <p>Webcam: {{ hasWebcam ? 'yes' : 'no' }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const hasWebcam = ref(false);

const detectWebcam = () => {
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) {
        hasWebcam.value = false;
        return;
    }
    md.enumerateDevices().then(devices => {
        hasWebcam.value = devices.some(device => 'videoinput' === device.kind);
    });
};

onMounted(() => {
    detectWebcam();
});
</script>

<style>
/* Add your styles here */
</style>
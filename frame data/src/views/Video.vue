<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>running</div>
    <input type="file" @change="handleFileChange">
    <img v-if="grayImage" :src="grayImage" alt="Grayscale Image">
    <br>
    <iframe src="" frameborder="1" width="100" height="100"></iframe>
    <br>
    <canvas ref="canvas" width="200" height="200"></canvas>
</template>

<script setup>
import opencv from '@techstark/opencv-js';
import { ref } from 'vue';

const grayImage = ref(null);
const canvas = ref(null);

async function handleFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
        const imageData = new Uint8Array(reader.result);
        const src = opencv.imread(imageData);
        const dst = new opencv.Mat();
        opencv.cvtColor(src, dst, opencv.COLOR_RGBA2GRAY, 0);
        const grayImageBlob = new Blob([dst.data], { type: 'image/png' });
        grayImage.value = URL.createObjectURL(grayImageBlob);
        console.log('Color is changed');

        // Clear and redraw the canvas
        const ctx = canvas.value.getContext('2d');
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
        canvas.value.width = dst.cols;
        canvas.value.height = dst.rows;
        ctx.putImageData(new ImageData(dst.data, dst.cols, dst.rows), 0, 0);
    };
    reader.readAsArrayBuffer(file);
}
</script>
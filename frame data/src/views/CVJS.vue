<template>
    <div>main</div>
    <input type="file" @input="userimage">
    <!-- <br> -->
    <!-- <canvas ref="canvas"></canvas> -->
    <ARComponent />
</template>

<script setup>
import ARComponent from '@/components/ARComponent.vue';
// import CV from '@techstark/opencv-js';
// import io from 'socket.io-client';
// import 'aframe';
// import 'aframe-stereo-component';
// import { ref } from 'vue';


const image = new Image();
// const canvas = ref();

function userimage(event) {
    return new Promise((resolve, reject) => {
        const file = event.target.files[0];
        if (!file) {
            reject(new Error("No file selected."));
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            reader.result = URL.createObjectURL(event.target.files[0]);
            // const context = canvas.value.getContext('2d');

            // canvas.value.height = image.height;
            // canvas.value.width = image.width;

            // context.drawImage(image, 0, 0, image.width, image.height);
            // context.getImageData(0, 0, image.width, image.height);

            const dataURL = reader.result;
            image.value = dataURL;
            console.log(dataURL);
            resolve(dataURL);
        };
        reader.onerror = () => {
            reject(new Error("Error reading file."));
        };
        reader.readAsDataURL(file);
    });
}

// const server = io('http://localhost:2000');
// console.log(server);

/*
//pages/api/submit.js

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email } = req.body;
        // Perform server-side logic, e.g., save to database
        res.status(200).json({ message: `Received data for ${name}` });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
*/
</script>
<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {im} from '../../public/im.gltf'; // Adjust the path as necessary

const container = ref(null);

onMounted(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    container.value.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2);
    scene.add(light);

    // Load model from public folder
    const loader = new GLTFLoader();
    loader.load(
        '../../public/im.gltf',
        (gltf) => {
            const model = gltf.scene;
            model.scale.set(0.5, 0.5, 0.5);
            scene.add(model);
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
        }
    );

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.value.clientWidth / container.value.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    });
});
</script>

<template>
    <div ref="container" style="width: 20%; height: 240px;"></div>
</template>

<style scoped>
/* Optional styling */
</style>

<template>
    <div ref="threeContainer" class=""></div>
    <ARComponent />
</template>

<script setup>
import ARComponent from './ARComponent.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

// Refs
const threeContainer = ref(null);
let renderer, scene, camera, cube;
let moving = false;

// Initialize Three.js
const initThreeJS = () => {
    if (!threeContainer.value) return;

    // Create the scene
    scene = new THREE.Scene();

    // Create the camera
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    // Create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);
    threeContainer.value.appendChild(renderer.domElement);

    // Create a geometry and a material and then combine them into a mesh
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Apply rotation to the cube
        cube.rotation.x += 0;
        cube.rotation.y += 0;

        cube.position.x += 0;

        // Render the scene from the perspective of the camera
        renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        // renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setSize(500, 500);
    };
    window.addEventListener('resize', handleResize);

    const mouseScroll = (event) => {
        // event.preventDefault();
        camera.position.z += event.deltaY * 0.01;
        // console.log(camera.position.z);
    };
    window.addEventListener('wheel', mouseScroll);

    const mouseup = () => {
        moving = false;
    };
    threeContainer.value.addEventListener('mouseup', mouseup);

    const mouseMove = (event) => {
        // event.preventDefault();
        if(!moving){
            return;
        }
        cube.rotation.x += event.movementX * 0.01;
        cube.rotation.y += event.movementY * 0.01;
        // console.log(cube.rotation.x, cube.rotation.y);
    };
    threeContainer.value.addEventListener('mousemove', mouseMove);

    const clickFunciton = () => {
        moving = true;
    };
    threeContainer.value.addEventListener('mousedown', clickFunciton);

    function boxrightmove (event) {
        requestAnimationFrame(boxrightmove);

        if(event.key === 'ArrowRight'){
            cube.position.x += 0.01;
        }
    }
    threeContainer.value.addEventListener('keydown', boxrightmove);

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('wheel', mouseScroll);
        threeContainer.value.removeEventListener('mousedown', clickFunciton);
        threeContainer.value.removeEventListener('mousemove', mouseMove);
        threeContainer.value.removeEventListener('mouseup', mouseup);
        threeContainer.value.removeEventListener('keydown', boxrightmove);
    });
};

// On component mounted
onMounted(() => {
    initThreeJS();
});
</script>

<style scoped>
.three-container {
    width: 100%;
    height: 100vh;
    margin: 0px;
}
</style>
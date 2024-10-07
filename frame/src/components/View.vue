<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <a-scene>
            <!-- Example A-Frame content -->
            <a-box position="0 0.5 0" material="color: red"></a-box>
            <!-- Add other A-Frame entities or components here -->
        </a-scene>
    </div>
</template>

<script setup>
import 'aframe';
// If using the component via npm package
import 'aframe-stereo-component';
// import * as THREE from 'three';
</script>

<style scoped>
/* Your styles here */
</style>
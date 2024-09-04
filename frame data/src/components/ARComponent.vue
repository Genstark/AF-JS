<!-- src/components/ARScene.vue -->
<template>
    <!-- AR.js scene -->
    <a-scene vr-mode-ui="enabled: false;" renderer="logarithmicDepthBuffer: true; precision: medium;" embedded
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">

        <!-- Loader shown until image descriptors are loaded -->
        <div class="arjs-loader" v-show="loading">
            <div>Loading, please wait...</div>
        </div>

        <!-- Adding a box to the scene -->
        <a-box position="0 1.5 -3" rotation="0 45 0" color="#4CC3D9" ref="box">
        </a-box>

        <!-- Your AR content -->
        <a-marker type="nft">
            <a-entity scale="5 5 5" position="150 300 -100">
            </a-entity>
        </a-marker>

        <!-- Camera entity -->
        <a-entity camera></a-entity>
    </a-scene>
</template>


<script setup>
import { ref, onMounted } from 'vue';
// import { ArToolkitProfile, ArToolkitSource, ArToolkitContext, ArMarkerControls } from 'ar-js-org/three.js/build/ar-threex.js';
import 'aframe';
import 'ar.js/aframe/build/aframe-ar.js';


const box = ref('box');

onMounted(() => {
    console.log(box.value);
});

// eslint-disable-next-line no-unused-vars
function moving() {
    box.value.object3D.rotation.x += 0.1;
    // box.value.object3D.rotation.y += 0.1;
    // box.value.object3D.rotation.z += 0.1;
}

setInterval(moving, 50);

// const nftUrl = ref("https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/trex-image/trex");
// const gltfModelUrl = ref("https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf");

// const loading = ref(true);


// const onSceneLoaded = () => {
//     loading.value = false;
// };

// Ensure scripts are loaded
// onMounted(() => {
//     // You can optionally load scripts here if they are not included globally
//     const aframeScript = document.createElement('script');
//     aframeScript.src = 'https://cdn.jsdelivr.net/gh/aframevr/aframe@1.3.0/dist/aframe-master.min.js';
//     aframeScript.async = true;
//     document.head.appendChild(aframeScript);

//     const arjsScript = document.createElement('script');
//     arjsScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js';
//     arjsScript.async = true;
//     document.head.appendChild(arjsScript);
// });
</script>

<style scoped>
.ar-container {
    width: 100%;
    height: 100vh;
    margin: 0;
    overflow: hidden;
    position: relative;
}

.arjs-loader {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.arjs-loader div {
    text-align: center;
    font-size: 1.25em;
    color: white;
}
</style>
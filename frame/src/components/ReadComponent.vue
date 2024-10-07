<!-- eslint-disable no-undef -->
<template>
    <div class="arjs-loader" v-show="loading">
        <div>Loading, please wait...</div>
    </div>

    <a-scene vr-mode-ui="enabled: false;" renderer="logarithmicDepthBuffer: true; precision: medium;" embedded
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">

        <a-assets>
            <img id="chemical" src="../image/chemical.png">
            <img id="pencil" src="../image/pencil.png">
            <a-asset-item id="obj" src="../image/bug.obj"></a-asset-item>
            <a-asset-item id="mtl" src="../image/but.mtl"></a-asset-item>
            <a-asset-item id="out-source"
                src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf">
            </a-asset-item>
            <a-asset-item id="mag" src="../image/magnemite/scene.gltf"></a-asset-item>
            <a-asset-item id="ball" src="../image/fireball-energy-sphere/scene.gltf"></a-asset-item>
            <a-asset-item id="model1" src="../image/model1/untitled.gltf"></a-asset-item>
            <a-asset-item id="model2" src="../image/model2/untitled.gltf"></a-asset-item>
        </a-assets>

        <a-marker type="pattern" url="../image/pattern-desk.patt" smooth="true">
            <a-entity gltf-model="#mag" scale="0.1 0.1 0.1" position="0 0 0" rotation="0 0 0" ref="box"></a-entity>
        </a-marker>

        <a-marker type="pattern" url="../image/pattern-pencil.patt" smooth="true">
            <a-entity gltf-model="#ball" scale="0.1 0.1 0.1" position="0 0 0" rotation="0 0 0"></a-entity>
        </a-marker>

        <a-marker preset="hiro" smooth="true">
            <a-entity gltf-model="#mag" scale="0.1 0.1 0.1" position="0 0 0" rotation="0 0 0" ref="box"></a-entity>
        </a-marker>

        <!-- <a-entity
            gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
            scale="5 5 5" position="100 100 0">
        </a-entity>

        <a-marker type="nft">
            <a-entity scale="5 5 5" position="150 300 -100">
            </a-entity>
        </a-marker>

        <a-marker type='pattern'
            url='https://raw.githubusercontent.com/TimVanMourik/Armadillo/master/app/armadillo/static/img/patt/pattern-marker.patt'>
            <a-entity collada-model="#tree-model"></a-entity>
        </a-marker>

        <a-nft type="nft" videohandler url="https://raw.githack.com/AR-js-org/AR.js/master/data/dataNFT/pinball"
            smooth="true" smoothCount="10" smoothTolerance="0.01" smoothThreshold="5" preload="true">
            <a-video src="#vid" position="0 0 0" width="300" height="400" rotation="-90 0 0" videoelement></a-video>
        </a-nft> -->

        <a-entity camera></a-entity>
    </a-scene>
</template>


<script setup>
import { ref, onMounted } from 'vue';
// import { ArToolkitProfile, ArToolkitSource, ArToolkitContext, ArMarkerControls } from 'ar-js-org/three.js/build/ar-threex.js';
import 'aframe';
import 'ar.js/aframe/build/aframe-ar.js';


const box = ref('box');

// eslint-disable-next-line no-unused-vars
function changing() {
    box.value.object3D.rotation.x += 0.1;
    box.value.object3D.rotation.y += 0.1;
}

// setInterval(changing, 50);

const mag = ref('mag');

// eslint-disable-next-line no-unused-vars
function magn(){
    mag.value.object3D.scale.x += 0.01;
}
// setInterval(magn, 50);



// eslint-disable-next-line no-unused-vars
const nftUrl = ref("https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/trex-image/trex");
// eslint-disable-next-line no-unused-vars
const gltfModelUrl = ref("https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf");

const loading = ref(true);


// eslint-disable-next-line no-unused-vars
const onSceneLoaded = () => {
    loading.value = false;
};

// eslint-disable-next-line no-undef
onMounted(() => {
    // You can optionally load scripts here if they are not included globally
    const aframeScript = document.createElement('script');
    aframeScript.src = 'https://cdn.jsdelivr.net/gh/aframevr/aframe@1.3.0/dist/aframe-master.min.js';
    aframeScript.async = true;
    document.head.appendChild(aframeScript);

    const arjsScript = document.createElement('script');
    arjsScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js';
    arjsScript.async = true;
    document.head.appendChild(arjsScript);
});
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
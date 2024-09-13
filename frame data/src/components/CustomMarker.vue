<template>
    <div>
        <p>loading...</p>
    </div>
    <a-scene vr-mode-ui="enabled: false;" renderer="logarithmicDepthBuffer: true; precision: medium;" embedded
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">

        <a-assets>
            <a-asset-item id="area" src="../image/magnemite/scene.gltf"></a-asset-item>
            <a-asset-item id="obj" src="../image/bug.obj"></a-asset-item>
            <a-asset-item id="mtl" src="../image/bug.mtl"></a-asset-item>
        </a-assets>

        <a-entity gltf-model="#area" scale="5 5 5" position="100 100 0">
        </a-entity>

        <a-entity material="color: lightyellow" position="1 0 -2" scale="0.1 0.1 0.1"></a-entity>

        <a-entity obj-model="obj: #obj; mtl: #mtl;" scale="0.2 1 0" position="1 1 1" rotation="0 45 0"></a-entity>

        <a-sphere radius="1.2" material="color: lightblue" scale="0.3 0.3 0.3"></a-sphere>

    </a-scene>
</template>

<script setup>
import { signals } from 'signals';
import { onMounted } from 'vue';
import 'aframe';
import 'aframe-ar';
// import 'ar.js/aframe/build/aframe-ar.js';

onMounted(async () => {
    const api = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf';
    const option = {
        method: 'GET'
    };
    const fetching = await fetch(api, option);
    const data = await fetching.json();
    console.log(data);
});

onMounted(() => {

    if (typeof signals === 'undefined') {
        console.error('Signals library is not loaded');
        return;
    }


    // eslint-disable-next-line no-unused-vars, no-undef
    const session = new ARjs.Session();
});

</script>
// AFRAME.registerComponent('markerhandler', {

//     init: function () {
//         const animatedMarker = document.querySelector("#marker1");
//         const aEntity = document.querySelector("#markermodel");

//         // every click, we make our model grow in size :)
//         animatedMarker.addEventListener('click', function (ev, target) {
//             const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
//             if (aEntity && intersectedElement === aEntity) {
//                 const scale = aEntity.getAttribute('scale');
//                 Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
//                 aEntity.setAttribute('scale', scale);
//             }
//         });
//     }
// });

// const marker1 = document.getElementById('animated-marker');
// marker1.addEventListener('markerFound', () => {
//     console.log('Marker found');
// });
// marker1.removeEventListener('markerLost', () => {
//     console.log('Marker lost');
// });
const fs = require('fs');
// const response = await fetch('https://models-ar-69.s3.eu-north-1.amazonaws.com/scene.bin');
(async () => {
    try {
        console.log('Loading model...');
        const response = await fetch('https://models-ar-69.s3.eu-north-1.amazonaws.com/IronMan.gltf');
        const arrayBuffer = await response.arrayBuffer();
        fs.writeFileSync('aws-model.gltf', Buffer.from(arrayBuffer));
        console.log('Model saved as aws-model.gltf');
    } catch (error) {
        console.error('Error loading model:', error);
    }
})();
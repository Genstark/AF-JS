const cube = document.getElementById('defaultBox');
const box1 = document.getElementById('box-1');

cube.addEventListener('markerFound', () => {
    console.log('Marker found');
    box1.object3D.rotation.x += 0.1;
});

cube.addEventListener('markerLost', () => {
    console.log('Marker lost');
    box1.object3D.rotation.x = 0;
});


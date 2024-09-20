const markercube = document.getElementById('markercube');
const box = document.getElementById('box-1');
let boxMove = false;

markercube.addEventListener('markerFound', () => {
    boxMove = true;
    setInterval(cubemoving, 200);
});

function cubemoving() {
    if (boxMove) {
        box.rotation.x += 0.1;
    }
    else {
        box.rotation.x = 0;
    }
}

markercube.addEventListener('markerLost', () => {
    boxMove = false;
    clearInterval(moving);
    markercube.removeEventListener('markerFound', cubemoving);
    markercube.removeEventListener('markerLost', cubemoving);
});

const markerball = document.getElementById('markerball');
const fireball = document.getElementById('fireball-1');
let fireballMove = false;

markerball.addEventListener('markerFound', () => {
    fireballMove = true;
    setInterval(ballmoving, 200);
});

function ballmoving() {
    if (fireballMove) {
        fireball.rotation.x += 0.1;
    }
    else {
        fireball.rotation.x = 0;
    }
}

markerball.addEventListener('markerLost', () => {
    fireballMove = false;
    clearInterval(ballmoving);
    markerball.removeEventListener('markerFound', ballmoving);
    markerball.removeEventListener('markerLost', ballmoving);
});

const markermag = document.getElementById('markermag');
const mag = document.getElementById('magnemite');
let magmove = false;

markermag.addEventListener('markerFound', () => {
    magmove = true;
    setInterval(magmoving, 200);
});

function magmoving() {
    if (magmove) {
        mag.rotation.x += 0.1;
    }
    else {
        mag.rotation.x = 0;
    }
}

markermag.addEventListener('markerLost', () => {
    magmove = false;
    clearInterval(magmoving);
    markermag.removeEventListener('markerFound', magmoving);
    markermag.removeEventListener('markerLost', magmoving);
});


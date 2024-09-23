const marker1 = document.getElementById('markercube');
const model1 = document.getElementById('model-11');
let ismodel1 = false;

marker1.addEventListener('markerFound', () => {
    ismodel1 = true;
    setInterval(moving(ismodel1), 100);
});

function moving(box){
    if(box){
        model1.ariaOrientation.x += 0.1;
    }
    else{
        model1.ariaOrientation.x = 0;
    }
}

marker1.addEventListener('markerLost', () => {
    ismodel1 = false;
    clearInterval(moving(ismodel1));
    marker1.removeEventListener('markerFound', moving);
    marker1.removeEventListener('markerLost', moving);
});
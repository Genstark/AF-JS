<style scoped>
.canvasContainer {
    width: fit-content;
    height: fit-content
}

/* .canvasContainer:hover{
    cursor: url('../image/pencil.png'), auto;
} */

.cursorgrab{
    cursor: grab;
}
</style>


<!-- eslint-disable no-unused-vars -->
<template>
    <ExternalCamera />
    <div>
        <input type="file" accept=".png" @change="collect($event)">
        <button @click="google">send</button>
        <br>
        <input type="text" v-model="userinput" @input="inputelement($event)">
        <br>
        <!-- <iframe src="https://cmpmarketplacebackend.onrender.com" frameborder="0" allowfullscreen="true"></iframe> -->
        <iframe src="http://localhost:2000/findcategory" frameborder="1" allowfullscreen="true" width="500px"
            height="300px"></iframe>
        <p v-if="num">{{ num }}</p>
        <p v-else>wait....</p>
        <button @click="add">add</button>
        <br>
        <button @click="con = !con">click</button>
        <p v-if="con">ok</p>
        <p v-else>no</p>

        <button :style="duynamic" @click="con = !con">click</button>

        <input type="file" @input="folderInput($event)" />
        <br>

        <div ref="canvasContainer" class="canvasContainer">
            <canvas ref="canvas"></canvas>
        </div>
    </div>
</template>

<script setup>
import ExternalCamera from '@/components/ExternalCamera.vue';

import Matter from 'matter-js';

import { ref, onMounted, onUpdated, onUnmounted, computed } from 'vue';

const userImage = ref('');
const userinput = ref(null);
const num = ref(null);
const con = ref(true);
const canvas = ref('canvas');
const inputImage = ref(null);



// onMounted(() => {
//     if (canvas.value) {
//         canvas.value.style.border = '1px solid black';
//         const ctx = canvas.value.getContext('2d');
//         const image = new Image();

//         image.onload = () => {
//             // Draw the image onto the canvas after it has loaded
//             ctx.drawImage(image, 0, 0, 100, 100); // Draw the image at (0, 0) with size 100x100
//         };

//         // Set the source of the image (adjust the path as per your project structure)
//         // eslint-disable-next-line no-undef
//         image.src = require('@/image/chemical.png'); // Adjust the path based on your project structure

//         // Draw a gray filled rectangle on the canvas
//         ctx.fillStyle = 'gray';
//         ctx.fillRect(10, 10, 100, 100); // Draw a gray rectangle at (10, 10) with size 100x100
//     }
// });

const canvasContainer = ref(null);
let engine = null;
let box = null;
let box1 = null;


onMounted(() => {
    // Create a Matter.js engine
    engine = Matter.Engine.create();

    // Create a renderer
    const render = Matter.Render.create({
        element: canvasContainer.value,
        canvas: canvas.value,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            wireframes: false
        }
    });
    box = Matter.Bodies.rectangle(100, 100, 80, 80, {
        render: {
            fillStyle: 'yellow', // Change color here
            strokeStyle: 'none',
            lineWidth: 0
        }
    });

    box1 = Matter.Bodies.rectangle(200, 100, 80, 80, {
        render: {
            fillStyle: 'red', // Change color here
            strokeStyle: 'none',
            lineWidth: 0
        }
    });

    // Add the box to the world
    Matter.World.add(engine.world, [box, box1]);

    // Run the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    const mouse = Matter.Mouse.create(canvas.value);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Matter.World.add(engine.world, mouseConstraint);

    // Arrow key event handler
    const handleArrowKeys = (event) => {
        event.preventDefault(); // Prevent the default action (scrolling)
        switch (event.key) {
            case 'ArrowRight':
                // eslint-disable-next-line no-case-declarations
                let collision = Matter.SAT.collides(box, box1);
                if (collision) {
                    Matter.Body.translate(box, { x: 0, y: 0 });
                }
                else {
                    Matter.Body.translate(box, { x: 2, y: 0 });
                }
                break;
            case 'ArrowLeft':
                Matter.Body.translate(box, { x: -2, y: 0 });
                break;
            case 'ArrowUp':
                Matter.Body.translate(box, { x: 0, y: -20 });
                break;
            case 'ArrowDown':
                Matter.Body.translate(box, { x: 0, y: 2 });
                break;
        }
    };

    window.addEventListener('keydown', handleArrowKeys);

    const mouseClick = (event) => {
        event.preventDefault();
        console.log(event.which);
    };
    window.addEventListener('mousedown', mouseClick);

    const checkMouseOver = () => {
        const mousePosition = mouse.position;
        const boxBounds = box.bounds;
        const isMouseOver = Matter.Bounds.contains(boxBounds, mousePosition);

        if (isMouseOver) {
            canvasContainer.value.classList.add('cursorgrab');
            canvasContainer.value.addEventListener('mousedown', (event) => {
                event.preventDefault();
                if(event.which === 1){
                    Matter.Body.translate(box, { x: event.clientX, y: event.clientY });
                    // console.log('mouse is click');
                }
            });
        }
        else{
            canvasContainer.value.classList.remove('cursorgrab');
        }

        requestAnimationFrame(checkMouseOver);
    };

    checkMouseOver();

    // eslint-disable-next-line no-undef
    onUnmounted(() => {
        window.removeEventListener('keydown', handleArrowKeys); // Clean up event listener
        // window.removeEventListener('mousedown', mouseClick);
        Matter.World.remove(engine.world, mouseConstraint);
    });

    // Auto Down box
    let downside = 5;
    const movingDown = () => {
        const boxPosition = box.position;
        if (boxPosition.y >= 600 - 40) {
            Matter.Body.translate(box, { x: 0, y: 0 });
        }
        else {
            Matter.Body.translate(box, { x: 0, y: downside });
        }
        requestAnimationFrame(movingDown);
    }

    movingDown();

    // Movement logic for box1
    let direction = 1; // 1 for right, -1 for left
    const speed = 2;

    const updateBox1Movement = () => {
        const box1Position = box1.position;
        if (box1Position.x <= 0 + 40 || box1Position.x >= 800 - 40) {
            direction *= -1;
        }

        if (Matter.SAT.collides(box, box1)) {
            Matter.Body.translate(box1, { x: 0, y: 0 });
        }
        else {
            Matter.Body.translate(box1, { x: speed * direction, y: 0 });
        }

        // Request the next frame
        requestAnimationFrame(updateBox1Movement);
    };

    updateBox1Movement(); // Start the movement loop
});


const duynamic = computed(() => ({
    backgroundColor: con.value ? 'red' : 'white'
}));


function google() {
    try {
        const filedata = new FormData();
        filedata.append('file', userImage.value);

        const url = 'http://localhost:2000/upload';
        const options = {
            method: "POST",
            body: filedata
        };

        console.log('wait...');
        fetch(url, options).then(res => {
            return res.text();
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }
    catch {
        console.log('error');
    }
}

function collect(event) {
    userImage.value = event.target.files[0];
    console.log(userImage);
    console.log(memorySizeOf(userImage.value));
    console.log(userImage.value.size);
    console.log(formatByteSize(userImage.value.size));
}

function formatByteSize(bytes) {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
    else return (bytes / 1073741824).toFixed(3) + " GiB";
}


onMounted(() => {
    const number = 234;
    const url = 'https://cmpmarketplacebackend.onrender.com/items';
    const options = {
        method: "GET"
    };
    console.log('wait....');
    fetch(url, options).then(res => {
        return res.json();
    }).then(data => {
        num.value = number;
        console.log(data);
    }).catch(error => {
        console.log(error);
    });
});

onUpdated(() => {
    console.log('updated');
});

onUnmounted(() => {
    console.log('unmounted');
});

// watchEffect(num.value,(currentValue, oldValue) => {
//     console.log('current value: ' + currentValue);
//     console.log('old value: ' + oldValue);
// });

function inputelement(event) {
    userinput.value = event.target.value;
    console.log(userinput.value);
}

function add() {
    num.value += 1;
    duynamic.value = 'add';

}

function memorySizeOf(obj) {
    let bytes = 0;

    function sizeOf(obj) {
        if (obj !== null && obj !== undefined) {
            switch (typeof obj) {
                case "number":
                    bytes += 8;
                    break;
                case "string":
                    bytes += obj.length * 2;
                    break;
                case "boolean":
                    bytes += 4;
                    break;
                case "object":
                    // eslint-disable-next-line no-case-declarations
                    let objClass = Object.prototype.toString.call(obj).slice(8, -1);
                    if (objClass === "Object" || objClass === "Array") {
                        for (let key in obj) {
                            if (!Object.prototype.hasOwnProperty.call(obj, key))
                                continue;
                            sizeOf(obj[key]);
                        }
                    } else bytes += obj.toString().length * 2;
                    break;
            }
        }
        return bytes;
    }

    function formatByteSize(bytes) {
        if (bytes < 1024) return bytes + " bytes";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
        else return (bytes / 1073741824).toFixed(3) + " GiB";
    }

    return formatByteSize(sizeOf(obj));
}

function folderInput(event) {
    console.log('uploading');
    inputImage.value = event.target.file[0];
    const input = event.target;
    console.log(input.value);
}
</script>
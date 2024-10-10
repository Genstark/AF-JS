<template>
    <div>
        <div v-for="(container, index) in containers" :key="index"
            style="width: 15%; border: 1px solid black; margin-bottom: 10px; position: relative;">
            <button @click="removeContainer(index)"
                style="position: absolute; top: -7px; right: -16px; font-size: 8px; border-radius: 100px;">
                X
            </button>
            <div style="height: 40px;">
                <input type="text" :disabled="statuses[index]" />
                <button @click="toggleStatus(index)">
                    {{ statuses[index] ? "Disable" : "Enable" }}
                </button>
            </div>
            <div style="display: flex; flex-wrap: wrap;">
                <div v-for="(file, fileIndex) in data[index]" :key="fileIndex"
                    style="position: relative; display: flex;">
                    <img :src="file" alt="" style="width: 40px; height: 40px; padding-left: 8px;" />
                    <button @click="removeFile(index, fileIndex)"
                        style="position: absolute; left: 41px; width: 5px; height: 12px; font-size: 10px; display: flex; align-items: center; justify-content: center;">
                        X
                    </button>
                </div>
                <br />
                <input type="file" multiple @change="printAll($event, index)" ref="inputStatus" accept=".png" />
            </div>
        </div>
        <div style="margin-top: 5px;">
            <button @click="addContainer">Add Box</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const statuses = ref([false]);
const data = ref([]);
const containers = ref([0]);
const inputStatus = ref([]);

const printAll = (event, boxIndex) => {
    const files = event.target.files;
    const allFiles = [];
    for (let i = 0; i < files.length; i++) {
        allFiles.push(URL.createObjectURL(files[i]));
    }
    data.value[boxIndex] = allFiles;
    console.log(data);
};

const removeFile = (boxIndex, fileIndex) => {
    data.value[boxIndex].splice(fileIndex, 1);
};

const removeContainer = (containerIndex) => {
    containers.value.splice(containerIndex, 1);
    data.value.splice(containerIndex, 1);
    statuses.value.splice(containerIndex, 1);
};

const toggleStatus = (index) => {
    statuses.value[index] = !statuses.value[index];
};

const addContainer = () => {
    containers.value.push(containers.value.length);
    statuses.value.push(false);
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>

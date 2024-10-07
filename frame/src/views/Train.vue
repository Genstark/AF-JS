<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <h1>Simple Running Model in Vue</h1>
        <p>Check the console for results.</p>
        <button @click="runModel">{{ button }}</button>
        <div v-if="trainingStats.currentEpoch !== null">
            <p>Current Epoch: {{ trainingStats.currentEpoch }}</p>
            <p>Current Loss: {{ trainingStats.currentLoss.toFixed(4) }}</p>
            <p>Current Accuracy: {{ trainingStats.currentAccuracy.toFixed(4) }}</p>
        </div>
        <div v-if="testAccuracy !== null">
            <p>Test Accuracy: {{ testAccuracy }}</p>
            <h3>First 5 Predictions:</h3>
            <ul>
                <li v-for="(result, index) in predictions" :key="index">
                    Predicted: {{ result.predicted }}, Actual: {{ result.actual }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import * as tf from '@tensorflow/tfjs';

// Define reactive state variables
const testAccuracy = ref(null);
const predictions = ref([]);
const trainingStats = ref({
    currentEpoch: null,
    currentLoss: 0,
    currentAccuracy: 0,
});

const button = ref('Run Model');

// Define the runModel function
const runModel = async () => {
    try {
        // Generate synthetic data
        button.value = 'Training';

        const numSamples = 1000;
        const xTrain = tf.randomUniform([numSamples, 1]);
        const yTrain = xTrain.greater(0.5).toInt();

        const numTestSamples = 200;
        const xTest = tf.randomUniform([numTestSamples, 1]);
        const yTest = xTest.greater(0.5).toInt();

        // Build the model
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [1] }));
        model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

        // Compile the model
        model.compile({
            optimizer: 'adam',
            loss: 'binaryCrossentropy',
            metrics: ['accuracy'],
        });

        // Define the onEpochEnd callback
        const onEpochEnd = (epoch, logs) => {
            trainingStats.value.currentEpoch = epoch + 1;
            trainingStats.value.currentLoss = logs.loss;
            trainingStats.value.currentAccuracy = logs.acc || logs.accuracy;
            console.log(`Epoch ${epoch + 1}: Loss = ${logs.loss.toFixed(4)}, Accuracy = ${logs.acc.toFixed(4)}`);
        };

        // Train the model
        await model.fit(xTrain, yTrain, {
            epochs: 100,
            batchSize: 32,
            validationSplit: 0.2,
            callbacks: { onEpochEnd },
        });

        // Evaluate the model
        const evalResult = model.evaluate(xTest, yTest);
        const testAcc = evalResult[1].dataSync()[0];
        testAccuracy.value = testAcc;
        console.log('\nTest accuracy:', testAcc);

        // Make predictions
        const predictionsArray = model.predict(xTest).arraySync();
        const yTestArray = yTest.arraySync();

        // Store the first 5 predictions and their true labels
        predictions.value = [];
        for (let i = 0; i < 5; i++) {
            predictions.value.push({
                predicted: predictionsArray[i][0].toFixed(4),
                actual: yTestArray[i][0],
            });
        }

        button.value = 'Run Model';

    } catch (error) {
        console.error('Error during model execution:', error);
    }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
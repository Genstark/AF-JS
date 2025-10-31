const express = require('express');
const path = require('path');
const ngrok = require('@ngrok/ngrok');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Serve static files (like images, JS, CSS, models, etc.)
app.use(express.static(path.join(__dirname)));
app.use(cors(
    {
        origin: '*', // Allow all origins for CORS
        methods: ['GET', 'POST'], // Allow GET and POST methods
        allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
    }
));

// Route to send the HTML file
app.get('/', (req, res) => {
    console.log('Received request for index.html');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/model', async (req, res) => {
    try {
        console.log('Fetching model from S3...');
        const response = await axios.get('https://models-ar-69.s3.eu-north-1.amazonaws.com/IronMan.gltf', {
            responseType: 'arraybuffer'
        });
        console.log('Model fetched successfully, sending response...');
        res.setHeader('Content-Type', 'model/gltf-binary');
        res.status(200).send(response.data);
    } catch (error) {
        console.error('Error fetching model:', error);
        res.status(500).send('Error fetching model');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

ngrok.connect({ addr: PORT, authtoken: '2tMPw4qx5Mor1rfuMhQDkQCOHZK_7J85MvYBRgC1kfLyGkM7S' })
    .then(listener => console.log(`Ingress established at: ${listener.url()}`));
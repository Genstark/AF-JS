const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'public'), { 'extensions': ['html', 'css', 'js', 'glb'] }));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/mag', (req, res) => {
    // console.log('mag req');
    res.status(200).sendFile(path.resolve(__dirname, 'model-1.glb'));
});


app.listen(1000, () => {
    console.log(`Server is running on http://localhost:${1000}`);
});
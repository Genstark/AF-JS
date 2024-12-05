const express = require('express');
const app = express();

// Middleware
app.use(express.json());

app.listen(1000, () => {
    console.log(`Server is running on http://localhost:${1000}`);
});
const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.get('/timestamp', (req, res) => {
    res.send(`${Date.now()}`);
})


exports.app = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

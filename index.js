// app.js
const { alldown } = require('nayan-media-downloader');
const { ephoto, gpt } = require('nayan-server');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sakibin-75f62.appspot.com"
});

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
// Optional: Endpoint to verify ID tokens (for authenticated requests)

app.get('/alldl', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('Please provide a URL as a query parameter.');
    }

    try {
        const data = await alldown(url);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error processing the request');
    }
});

app.get('/gptgo', (req, res) => {
const userPrompt = req.query.prompt || "Hello"; 
    gpt({
        messages: [
            {
                role: "assistant",
                content: "Hello! How are you today?"
            },
            {
                role: "user",
                content: "Sakibin is Programmer from Bangladesh, He completed programming language like html, css, bootstrap, node js, bash. Find him into facebook: https://fb.me/imsakibin007"

            },
            {
                role: "assistant", // fixed typo from "assitant" to "assistant"
                content: "Hello, Nayan! How are you today?"
            }
        ],
        prompt: userPrompt,
        model: "GPT-4",
        markdown: false
    }, (err, data) => {
        if(err) {
            return res.status(500).send({error: err.message});
        }

        res.send(data);
    });
});

app.get('/download', async (req, res) => {
    const url = req.query.url;
    const fileName = 'high_quality_video.mp4';

    try {
        // Fetch the video using Axios
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream', // Important to handle large video files
        });

        // Set the headers to prompt a download in the browser
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'video/mp4');

        // Pipe the Axios response directly to the client
        response.data.pipe(res);

    } catch (error) {
        console.error('Error downloading video:', error);
        res.status(500).send('Error downloading video');
    }
});


app.post('/verifyToken', async (req, res) => {
  const idToken = req.body.token;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.status(200).send(decodedToken);
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

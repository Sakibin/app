// app.js
const { alldown } = require('nayan-media-downloader');
const { ephoto, gpt } = require('nayan-server');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = { "type": "service_account",
                         "project_id": "sakibin-75f62",
                         "private_key_id": "129481e6e985a985066270b28e322679b1f6bea5",
                         "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/Mv5rVQMLQ/AA\nn+DXoLToPZsWQjAfxMq+XXyL59hTnOXBtWB2i6gzH3/n3hSVyfQBMr08LuCSQ50R\nfqyoWuLr9NIR+2tR8RjcVp0tIu9/uHYswEqs3TCKpmjhWNOAQeEHz/7UtADzZRVL\nv1XWZCeN8I4hHRKpLO+l8QtQbqhwMSyYS5NZBrLlKhj0tEFtl8vUzZmfhQ3uRXOL\nMNtOeswoo4gJUZ64y8drNf0mH+wP+1sDaZ6svE2sTV0Mt4/inu1ytV5GVhsSxUkM\nDTk9CQxiueLLkHDgHOjCwZyURqwXMSBj9oyMIakyg/ATW/WGvJ6scCWxrTnnn82a\nD33jQA4hAgMBAAECggEACU+a6zArI0fOLsGaafXGCY9Cd62GeW2Ub/vOfmOuebfo\nymuiRHOdn8u3Z1u9xeOdUdeeNomT3xuS0RDJqLMwXMxB1KVZPxbOHqDLK7EJV79s\nZdaBbHSjEgVzkxHHzvWmV0KORt5zM2cnR9aMABJFiNh/m2Y2i+2HyB16bxLMehYd\nVKdl5vDwQSjbZJ2Cy5P/jOZ0faWGZLXeikNe3gRl72twQPA2hSBFlYW+yDE6dmK9\nAMqisF0s9aZEpZgkjvEzjMg1qC9xfDkw10odAkiwl7kuO+fEPpAA1+vruY3qjn3J\n30LVNhfeRlh9v3BrAw3eqhZ0ol89zXKTwyutkhBiKQKBgQDxGIM3Q1gZ13smnF1A\nRFum/5ohweEkPL7JpGRNCkoFgXCwsDB7eTdW3pcVcHOKJViFDr9TGsB3AdxZbUYE\nkbTzqoRGYZoJGdU9ljlbyVkxnm3YmwH+CYpX3hRnSerymANjZy5mgSsTXXNK8kMU\nPkV++u8Wlcqfon8X3iNQ2v0VZQKBgQDLBNZ5A6/dlnAOLmVo8xuRKzBjhgvdpIKs\nTB2FNheDP6dWNwqkKeYeqxNFFSqLk/1nvZZ78FM+rRH6XocmPaRZ9XODv5aETYIb\ni2iYoyg5YpNaRojm4U0b6JX5iKHm8eVRGMzDWLkxWSeUFu/a3kXQuh4O7BaREgqs\nsLKQRsqYDQKBgHsf9pr5ZHvGBNmCD0lr35aYgGFu/wifkRuvPZ3ufED1itRhFlFo\nZS+S+3tycz8AtYU2M9VAGzxrkdmFqbVZqBysX2MGI0E0lScfmelbGZbyfsyY1Nqk\niqc2/hqFsFv17/0Ky7KDkrkQB3ol4MXsy1b+1a0mEFWYCenpgwWe4JLVAoGBAKk9\nojEFgtD9PPKFeOJxbzSoRVFiCHg/UPOjDCTlf9pY8P1tKwDJMN22DX1UdMAgoWme\n4Vj2cd7Y1hjaPl4BmwWnGSHmT+qA1opxv8MmmDymUWI7VJrrjKVMUeHQJe9pDZp6\nSxA54UAjK1xHdrIFAzxKOw6Dfxh2atGlB2ZArVjtAoGBAOI5W7J9SWGVdt/ahHB6\nzC4rUfNj7jqQ7Ri1t/BSVq1HyHQS0fXgda85Z7TeLBtt259UYZyNPbTGcYZty777\nVKN0rC+YtjvDGFW5vF1CAR367QHwhx2ujnYwV28YLY6Q/m1QKzvd5ePp8GHALngy\nuq35HKEw9sD4uy7w13EQ5IHs\n-----END PRIVATE KEY-----\n",
                         "client_email": "firebase-adminsdk-osh5o@sakibin-75f62.iam.gserviceaccount.com",
                         "client_id": "112381259901301320288",
                         "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                         "token_uri": "https://oauth2.googleapis.com/token",
                         "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                         "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-osh5o%40sakibin-75f62.iam.gserviceaccount.com",
                         "universe_domain": "googleapis.com"};

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

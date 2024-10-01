const express = require('express');
const { RsnChat } = require('rsnchat');
const { alldown } = require('nayan-media-downloader');
const { ephoto, gpt } = require('nayan-server');
//const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;

// Initialize RSNChat with your API key
const rsnchat = new RsnChat('rsnai_dc0AeSF1JUEOA8dPEOkupsKs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ai.html'));
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

app.get('/gpt4', async (req, res) => {
    try {
        const userPrompt = req.query.prompt || 'Hello, what is your version?';
        const response = await rsnchat.gpt4(userPrompt);
        res.json({ message: response.message });
    } catch (error) {
        console.error('Error fetching GPT-4 response:', error);
        res.status(500).json({ error: 'Failed to fetch response from GPT-4' });
    }
});

app.get('/gpt3', async (req, res) => {
    try {
        const userPrompt = req.query.prompt || 'Hello, what is your version?';
        const response = await rsnchat.gpt(userPrompt);
        res.json({ message: response.message });
    } catch (error) {
        console.error('Error fetching GPT-3 response:', error);
        res.status(500).json({ error: 'Failed to fetch response from GPT-3' });
    }
});

app.get('/gemini', async (req, res) => {
    try {
        const userPrompt = req.query.prompt || 'Hello, what is your version?';
        const response = await rsnchat.gemini(userPrompt);
        res.json({ message: response.message });
    } catch (error) {
        console.error('Error fetching gemini response:', error);
        res.status(500).json({ error: 'Failed to fetch response from gemini' });
    }
});

app.get('/ephoto', async (req, res) => {
    const { number, text } = req.query;

    if (!number || !text) {
        return res.status(400).send('Missing url or text parameter');
    }

    if (!req.query.text) return 
    if (!req.query.number) return 
    if (req.query.number == "1"){ var url = "https://en.ephoto360.com/create-a-cloud-text-effect-in-the-sky-618.html"}
    if (req.query.number == "2"){ var url = "https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html"}
    if (req.query.number == "3"){ var url = "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html"}
    if (req.query.number == "4"){ var url = "https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html"}
    if (req.query.number == "5"){ var url = "https://en.ephoto360.com/write-text-on-wet-glass-online-589.html"}
    if (req.query.number == "6"){ var url = "https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html"}
    if (req.query.number == "7"){ var url = "https://en.ephoto360.com/green-neon-text-effect-395.html"}
    if (req.query.number == "8"){ var url = "https://en.ephoto360.com/text-firework-effect-356.html"}
    if (req.query.number == "9"){ var url = "https://en.ephoto360.com/online-hot-metallic-effect-341.html"}
    if (req.query.number == "10"){ var url = "https://en.ephoto360.com/paint-splatter-text-effect-72.html"}
    try {
        // Generate the image using ephoto
        const response = await ephoto(url, [text]);

        if (response.status && response.url) {
            // Fetch the image data from the generated URL
            const imageResponse = await axios.get(response.url, { responseType: 'arraybuffer' });

            // Set the correct content-type and send the image
            res.set('Content-Type', 'image/png');
            res.send(imageResponse.data);
        } else {
            res.status(500).send('Failed to generate image');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/get', async (req, res) => {
  try {
    const response = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
    const getemail = response.data[0];
    res.json({ email: getemail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Err: 500' });
  }
});

app.get('/inbox/:email', async (req, res) => {
  try {
    const divide = req.params.email.split('@');
    const name = divide[0];
    const domain = divide[1];
    const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${name}&domain=${domain}`); 
    const messages = response.data;
    const mainmsg = [];
    for (const message of messages) {
      const msgId = message.id;
      const sendmsg = await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${name}&domain=${domain}&id=${msgId}`);   
      const sendmessage = {
        from: sendmsg.data.from,
        subject: sendmsg.data.subject,
        body: sendmsg.data.textBody,
        date: sendmsg.data.date
      };
      mainmsg.push(sendmessage);
    }
    res.json(mainmsg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Err: 500' });
  }
});

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


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

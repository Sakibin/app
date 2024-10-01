const express = require('express');
const { ephoto } = require('nayan-server');
const axios = require('axios');

const app = express();
const port = 3000; // You can set any port you prefer

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

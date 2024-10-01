const express = require('express');

const firebase = require('firebase/app');
require('firebase/auth');


const bodyParser = require('body-parser');

// Initialize Firebase
//const firebaseConfig = {
  // Replace with your Firebase configuration
//};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9oOgsN0IE5vw48dnp1n4SykPSQsL8lSw",
  authDomain: "sakibin-75f62.firebaseapp.com",
  projectId: "sakibin-75f62",
  storageBucket: "sakibin-75f62.appspot.com",
  messagingSenderId: "732867500543",
  appId: "1:732867500543:web:96df65624c7897c106efca",
  measurementId: "G-BGGNPS1N1X"
};

firebase.initializeApp(firebaseConfig);

// Create Express app
const app = express();
const port = 3000;

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Handle successful signup
      const user = userCredential.user;
      console.log('User created:', user.uid);
      res.send('Signup successful');
    })
    .catch((error) => {
      // Handle signup errors
      console.error('Error creating user:', error);
      res.status(500).send('Signup failed');
    });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Handle successful login
      const user = userCredential.user;
      console.log('User logged in:', user.uid);
      res.send('Login successful');
    })
    .catch((error) => {
      // Handle login errors
      console.error('Error logging in:', error);
      res.status(500).send('Login failed');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
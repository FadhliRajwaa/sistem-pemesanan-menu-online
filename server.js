require('dotenv').config();
const cors = require('cors');  // Import the cors package
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Enable CORS for all origins
app.use(cors());  // Place cors middleware before any route definitions

// Middleware to parse JSON
app.use(bodyParser.json());



// Menyajikan file statis dari folder 'public'
app.use(express.static('public'));


// Rute utama untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Pastikan 'index.html' ada di dalam folder 'public'
});



// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });


// Routes
app.use('/api', apiRoutes);




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

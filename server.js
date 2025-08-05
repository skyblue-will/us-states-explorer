const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Main route serves the interactive app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for app info
app.get('/api/info', (req, res) => {
  res.json({
    app: 'US States Explorer',
    version: '1.0.0',
    features: [
      'Capital Quiz Game',
      'Random State Facts',
      'Interactive State Explorer',
      'Size Comparison Challenge'
    ],
    totalStates: 50,
    time: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`US States Explorer running on port ${PORT}`);
});
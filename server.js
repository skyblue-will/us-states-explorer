const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Main route serves the gamified version (MUST BE BEFORE static)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'gamified.html'));
});

// Serve static files (HTML, CSS, JS) - AFTER main route
app.use(express.static(__dirname));

// Original version still available
app.get('/simple', (req, res) => {
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
  console.log(`US States Master (Gamified) running on port ${PORT}`);
  console.log(`Main route: Gamified version`);
  console.log(`Simple route: /simple for original`);
});
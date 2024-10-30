const express = require('express');
const mongoose = require('mongoose');
const OrderRoute = require('./route/OrderRoute');
const bodyParser = require('body-parser');

const app  = express();
const PORT = 3000;

app.use(express.json);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/eadp', {

}).then(() => console.log('MongoDB connected'))
    .catch(error => console.log('MongoDB connection error:', error));

// Routes
app.use('/api/v1', OrderRoute);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

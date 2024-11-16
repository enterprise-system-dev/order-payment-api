const express = require('express');
const mongoose = require('mongoose');
const OrderRoute = require('./route/OrderRoute');
const bodyParser = require('body-parser');

const { Eureka } = require('eureka-js-client');

const app = express();
const PORT = 3000;

// Eureka client configuration
const client = new Eureka({
    instance: {
        app: 'order-payment-service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: { '$': 3001, '@enabled': true },
        vipAddress: 'order-payment-service',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/',
    },
});


// Middleware
app.use(express.json()); // Fixed middleware invocation
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/eadp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log('MongoDB connection error:', error));

// Routes
app.use('order-payment-service/api/v1', OrderRoute);

// Eureka client start
client.start((error) => {
    if (error) {
        console.log('Eureka registration failed:', error);
    } else {
        console.log('Eureka registration successful!');
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
.then(() => {
    console.log('Server connection to the database is successful');
}).catch((err) => {
    console.error('MongoDB connection failed: ', err);
});
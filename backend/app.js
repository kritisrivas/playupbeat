const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const tournamentsRoutes = require('./routes/tournaments-routes');
const usersRoutes = require('./routes/users-routes');
const registrationRoutes = require('./routes/registration-routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

// Define Routes
app.use('/api/users', usersRoutes);
app.use('/api/tournaments', tournamentsRoutes);
app.use('/api/registrations', registrationRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

// Port Number
const PORT = process.env.PORT ||5000;

// Connect to MongoDB and start server
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.iimpyqt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>app.listen(PORT, ()=>{
    console.log(`Server listening to port ${PORT}`)
})).catch();
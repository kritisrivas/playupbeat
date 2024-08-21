const express = require('express');
const mongoose = require('mongoose');
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

  
// Connect to MongoDB and start server
mongoose.connect('mongodb+srv://kritisrivastava28:zTCRBUqWdy3BR7KU@cluster0.iimpyqt.mongodb.net/playupbeat?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>app.listen(5000)).catch();
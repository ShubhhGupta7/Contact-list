// Require the library
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

// Acquire the Connection (To check if it is successful)
const db = mongoose.connection;

// Error
db.on('error', console.error.bind(console, 'Error connecting to the database'));

// Up and running print the message
db.once('open', function() {
    console.log('Successfully connected to the database');
});


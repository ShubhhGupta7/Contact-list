const { model } = require("mongoose");

// Including the mongoose
const mongoose = require('mongoose');

// Creating a Schema
// Which type of object data will be stored, (fields in the document)
const contactSchema = new mongoose.Schema({ 
    // Fields
    name : {
        type : String, 
        required : true
    },
    contact : {
        type : String,
        required : true
    }
});

// Creating a collection Contact, of document's like contactSchema
// Contact first letter capital
// According to the naming conventions
const Contact = mongoose.model('Contact', contactSchema);

// Exporting database Collection
module.exports = Contact;
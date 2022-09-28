const { response } = require('express');

// Express is the framework which we are using to devlop our app.
const express = require('express');

// Path is used to append to path.
// This module is included in nodejs, Need not to install it.
const path = require('path');

// Port is where out server of Website runs
// Every website have its unique port no.
// Default port no. is 80
const port = 8000;

// Connecting to the database
const db = require('./config/mongoose');

// Including Collection of contactSchema
const Contact = require('./models/contact');

// Creating the server
const app = express();

// setting view engine 
app.set('view engine', 'ejs');

// Setting path to the views of MVC artitecture
app.set('views', path.join(__dirname, 'views'));

// urlencoded is only used to decode the form, encoded by the browser
// Its a middle ware
app.use(express.urlencoded());

// Setting up static files CSS, JS, images
app.use(express.static('asserts'));

// Every url requrest goes through the middleqare
// next is used to pass the query to next chained middleware or to the get method
// In middle ware we can add change access the req
// We can chain multiple middle ware 
// // MiddleWare 1
// app.use(function(req, res, next) {
    
//     req.my_name = 'Shubh';
//     console.log("In Middle ware 1");
//     next();
// });

// // Middle Ware 2
// app.use(function(req, res, next) {

//     console.log(req.my_name);
//     console.log("In Middle ware 2");
//     next();
// });


// We have used DB instead of RAM to make changes premanent on our server, after the server is Down.
// var contactList = [
   
//     {
//         name : 'Shubh Gupta',
//         contact : '9752897467'
//     },
    
//     {   
//         name : 'Krati Vishnao',
//         contact : '9424467679'
//     },

//     {
//         name : "Papa Idea",
//         contact : '9009471562'
//     },

//     {
//         name : "Mummy",
//         contact : '9407570100'
//     },

//     {
//         name : 'Muskan di',
//         contact : '8085288181'
//     },

//     {
//         name : 'Harsh Soni',
//         contact : '7999901493'
//     }
// ];

// Adding a Contact.

// There are five requests GET, POST, DELETE, PUT, PHARSE
app.post('/create-contact', function(req, res) {

    //console.log(req.my_name);
    // console.log(req.body);

    // contactList.push({
    //     name : req.body.name,
    //     contact : req.body.contact
    // });

    //Here we are storing data in RAM, which is tempropary, Data is gone as the server is dowm
    // So we are replacing this with our data base
    // contactList.push(req.body);

    // Setting up mongoDB
    Contact.create(req.body, function(err, newContact) {

        if(err) {
            console.log('Error in Importing contacts to the Database');
            return;
        }

        console.log('**********', newContact);
        return res.redirect('back');
    });
    // Contact.create({
    //     name : req.body.name,
    //     contact : req.body.contact
    // }, function(err, newContact) {
        
    //     if(err) {
    //         console.log('Error in importing data to the DataBase');
    //         return;
    //     }

    //     console.log('*********', newContact);
    //     return res.redirect('back');
    // });

    // We can send, render, redirect.
    // return res.redirect('/');
    //return res.redirect('back');
}); 

// Deleting a Contact.

// Query Params
// href = "/delete-contact/?contact=<%=item.contact%>&name=<%=item.name%>"
// app.get('/delete-contact/', function(req, res) {

//     console.log(req.query);
//     let contact = req.params.contact;
//     let name = req.query.name;
// });

// Params
// href = "/delete-contact/<%=item.contact%>"
// app.get('/delete-contact/:phone', function(req, res) {

//     console.log(req.params);
//     let phone = req.params.contact;
// });


// This is used when we are using RAM as our Storage.
// app.get('/delete-contact/', function(req, res) {
    
    
//     console.log(req.query);
//     let phone = req.query.contact;

//     // Arrow Function.
//     // arrName.findIndex(var_i =>(comparision));
//     // gives if not find the desired index.
//     let contactIndex = contactList.findIndex(item => item.contact == phone);

//     if(contactIndex != -1) {
//         // Splice is used to delete the items form a specific index in a array.
//         contactList.splice(contactIndex, 1);
//     }

//     return res.redirect('back');
// });

// In home ejs file
//  This was helpful with the RAM 
//  <a href="/delete-contact/?contact=<%= item.contact %>&name = <%= item.name%>"> 
                                
//  To Delete Contact by ID in Database query is different 

// Deleting Contact from the DataBase
app.get('/delete-contact/', function(req, res) {

    // Getting id By Query
    let id = req.query.id;

    // Using an inbuild mongoose function to delete
    Contact.findByIdAndDelete(id, function(err) {

        if(err) {
            console.log('Error in Deleting Contact Object from the Database');
            return;
        }

        return res.redirect('back');
    })

});

// send is used to send a response
// render is used to excess a ejs file and sent it to the browser
// redirect is used to divert the user to the other page of our Website

// This is made using RAM Storage,
// app.get('/', function(req, res) {
    
//     //console.log(req);
//     // return res.send('<h1>Yup! we are rendering our server, is its Aprilfoal?</h1>');
//     return res.render('home', {
//         // Sending object with all the variable key value pairs in the ejs file.
//         // This object is also called as the context.
//         title : 'My Contacts List',
//         contact_list : contactList
//     });
// });

// This GET function will show Contacts using DB.
app.get('/', function(req, res) {
    
    // This is the query request, When we want to fetch data according to some conditions, or queries.
    // We mentioned the query in the curley braces.
    // Contact.find({name : "Chiya"}, function(err, contacts) {

    // This is to fetch all the data in the database.
    // We have used the black curely braces to fetch all the data.
    // Contact.find({}, function(err, contacts) {
    
    Contact.find({}, function(err, contacts) {

        if(err) {
            console.log('Error in fetching the data from the DB');
            return;
        }

        return res.render('home', {
            title : 'My Contacts List',
            contact_list : contacts
        });
    });
});


app.get('/practise', function(req, res) {

    return res.render('practise', {
        title : 'Playground'
    });
});

// Listening to the port no. to run our server.
app.listen(port, function(err) {

    if(err) {
        console.log('Hey, There is a problem in starting the server');
    }

    console.log('Supurb Our server is successfully running om port no.:', port);
});
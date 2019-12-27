// Import express, cors and body parser
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import Database Connection Module 
const connect = require('./DB/conn');


//create express application
const app = express();
app.use(cors());




//parse requests to be of content-type - appplication 
app.use(bodyParser.urlencoded({extended:true}));


//parse requests of content-type - application/json
app.use(bodyParser.json());


// Connect to the database
connect();




// define a sample route 
// app.get('/',async (_req, res) => res.json({"user":"yashwin"}));


//Import the routes to make the listening work
require('./app/routes/loginData.routes')(app);


//listen for the req @ some port say 3000
app.listen(3000, ()=>{
    console.log("Server listenting on port 3000");
})
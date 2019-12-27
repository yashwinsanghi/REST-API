const loginData = require('../models/loginData.model');

// Create and save a new Login User Credential
// METHODS

exports.create = (req,res) =>{
    console.log("Create Called");
    // Validate Request 
    console.log(req.body);
    if(!req.body.username || !req.body.password  || !req.body.levelOfAuthority){
        return res.status(400).send({
            "message":" User Credentials cannot be empty"
        });
    }


    // Create a new Login User
    const loginUser = new loginData({
        username: req.body.username,
        password: req.body.password,
        levelOfAuthority: req.body.levelOfAuthority
    });


    // Save the Login User Credentials into the Database
    loginUser.save().then(
        data => {
            res.send(data);
        }
    ).catch(
        err => {
            res.status(500).send({
                message : err.message || "Some error occured while uploading the login Credentials to the Database."
            });
        }
    );
};


//Retrieve and Return all the user credentials from the database
//METHODS

exports.findAll = (req,res) => {
    console.log("Find all Called");
    loginData.find().then(
         users => {
                res.send(users);
            }
        ).catch( 
            err =>{
                res.status(500).send({
                    message: err.message || "Some error occured while retrieving user credentials"
                }
            );
        }
    );
};


// Find a single Login User data with id 
//METHODS

exports.findOne = (req,res) =>{
    console.log("Find one Called");
    loginData.findById(req.params.id).then(
        user => {
            //Check if the user with user id exists
            if(!user){
                //Return error

                return res.status(404).send({
                    message : " No User found with id "+ req.params.id
                });
            }
            // Send the Retrieved user Credentials 
            res.send(user);
        }
    ).catch(
        // Handle other errors Precisely 
        err =>{
            // If the error is and Object ID 
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                        message: " No User found with id "+ req.params.id
                    });
                }
            // Any other error
            return res.status(500).send({
                message : "Error retrieving user with id : "+ req.params.id
            });
        }
    );
};


// Update a User credential identified by the id in the request
//METHODS

exports.update = (req,res) => {
    console.log("Update Called");
    // Validate the request 
    if(!req.body.username || !req.body.password  || !req.body.levelOfAuthority){
        return res.status(400).send({
            message: " User Credentials cannot be empty"
        });
    }

    // Find the user credentials and update it with the request body
    loginData.findByIdAndUpdate(req.params.id,{
        username: req.body.username,
        password: req.body.password,
        levelOfAuthority: req.body.levelOfAuthority
    },{
        new: true
    }).then(
        user => {
            if(!user){
                return res.status(404).send({
                    message:" No user exists with id "+ req.params.id
                });
            }
            res.send(user);
        }
    ).catch(
        err=>{
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: " No user exists with id "+ req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Login Credentials with id "+req.params.id
            });
        }
    );
}; 


// Delete a User Credential identified by the id in the request
//METHODS 

exports.delete = (req,res) => {
    console.log("Delete Called");
    loginData.findByIdAndRemove(req.params.id).then(
        user => {
            if(!user){
                return res.status(404).send({
                    message: "No User exists with id " + req.params.id
                });
            }
            res.send({message:"User deleted Successfully"});
        }
    ).catch(
        err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "No User Found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Could not delete User with id " + req.params.id
            });
        }
    );
};
//Import Mongoose Component 
const mongoose = require('mongoose');


//Avoid Depreceated Warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Create a Schema 

let loginSchema = mongoose.Schema({
    username:{
        type: String
    },
    password:{
        type: String
    },
    levelOfAuthority:{
        type: String
    }
});

//Export the Schema
module.exports = mongoose.model('loginData',loginSchema);
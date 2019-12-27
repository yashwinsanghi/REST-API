const dbConfig = require('../config/database.config');
const mongoose = require('mongoose');

const ConnectDB = async () =>{
    await mongoose.connect(dbConfig.url,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(()=>{
        console.log("Successfully Connected to the Database");
    }).catch(er => {
        console.log('Could not connect to the database. Exiting now.. ', er);
        process.exit();
    });
}
module.exports = ConnectDB;
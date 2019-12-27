module.exports =  (app) => {
    const loginCtrl = require('../controllers/loginData.controller');
    
    //Cerate a new login User 
    app.post('/login',loginCtrl.create);

    //Retrieve all login Users list 
    app.get('/login',loginCtrl.findAll);

    //Retrieve a single user with userid
    app.get('/login/:id',loginCtrl.findOne);

    // Update a user with userid
    app.put('/login/:id',loginCtrl.update);

    // Delete a user with userid
    app.delete('/login/:id',loginCtrl.delete);
}
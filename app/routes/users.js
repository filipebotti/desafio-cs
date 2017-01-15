const UsersController = require('../controllers/users');
const Users = require('../models/users');

module.exports = (app) => {
    
    const usersController = UsersController(Users);

    app
        .route('/users/signup')
        .post((request, response) => {
            usersController 
                .create(request.body)
                .then(res => response.status(res.statusCode).send(res.data));
        });

    app
        .route('/users/signin')
        .post((request, response) => {
            usersController
                .auth(request.body)
                .then(res => response.status(res.statusCode).send(res.data));
        });
};
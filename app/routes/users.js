const UsersController = require('../controllers/users');
const Users = require('../models/users');

module.exports = (app) => {
    
    const usersController = UsersController(Users);

    app
        .route('/users')
        .post((request, response) => {
            usersController 
                .create(request.body)
                .then(res => response.status(res.statusCode).send(res.data));
        });
};
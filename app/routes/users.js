const UsersController = require('../controllers/users');
const Users = require('../models/users');
const debug = require('../shared/debugger')('routes:users');

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

    app
        .route('/users/:id')        
        .get((request, response) => { 
            const data = {
                token: request.token,
                id: request.params.id
            };

            usersController
                .getById(data)
                .then(res => response.status(res.statusCode).send(res.data));            
        });
};
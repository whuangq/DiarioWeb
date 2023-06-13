const Register = require('../models').Users;

class RegisterController {
    async index(req, res, next) {
        res.render('register/index');
    }
}

module.exports = RegisterController;

const Login = require('../models').Users;

class LoginController {
    async index(req, res, next) {
        res.render('login/index', { title: 'Base de Datos de Direcciones'});
    }
}

module.exports = LoginController;

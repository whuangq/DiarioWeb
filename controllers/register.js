const Users = require('../models').Users;

class RegisterController {
    async index(req, res, next) {
        if (req.method === "POST") {
            await Users.create({
              username: req.body.username,
              email: req.body.email,
              name : req.body.name,
              surnames: req.body.surnames,
              password : req.body.password,
              role : req.body.role
            });
            res.redirect("/login");
          } else {
            res.render("register/index")
    }}
}

module.exports = RegisterController;

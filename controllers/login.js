const Users = require('../models').Users;

class LoginController {
    async index(req, res, next) {
        if (req.method === "POST") {
            try {
                const user = await Users.findOne({
                    where: {
                        username: req.body.username,
                    }
                });
                if (user) {
                    if (user.password === req.body.password) {
                        req.session.username = user.username;
                        req.session.name = user.name;
                        req.session.surname = user.surname;
                        req.session.email = user.email;
                        req.session.role = user.role;
                        res.redirect('/publicaciones')
                    }
                } else {
                    res.redirect("/login", );
                }
            } catch (error) {
                res.render("login/index")
            }
          } else {
            res.render("login/index")
    }}
}

module.exports = LoginController;

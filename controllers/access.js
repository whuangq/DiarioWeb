const Users = require("../models").Users;

class AccessController {
    async index(req, res, next) {
        res.render('access/index');
    }
    
    async logout(req, res, next) {
        if (req.session) {
            req.session.destroy((err) => {
              if (err) {
                res.status(400).send("Error al cerrar la sesión.");
              } else {
                res.redirect("/publicaciones");
              }
            });
        } else {
            res.end();
        }
    }

    async delete(req, res, next) {
      await Users.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.redirect("/admin");
    }
}

module.exports = AccessController;

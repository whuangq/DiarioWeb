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
}

module.exports = AccessController;

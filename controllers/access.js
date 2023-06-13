class AccessController {
    async index(req, res, next) {
        res.render('access/index');
    }
}

module.exports = AccessController;

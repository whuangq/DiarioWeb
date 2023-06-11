const Address = require('../models').Address;

class AddressController { //ArticlesController
    async index(req, res, next) {
        const addresses = await Address.findAll(); // const articles = await Article.findAll()
        console.log("Controller addresses: " + addresses);
        if (req.session.flashMessage) { //                                         articles: articles
            res.render('addresses/index', { title: 'Base de Datos de Direcciones', addresses: addresses, flashMessage: req.session.flashMessage });
        }
        else {//                                                                   articles: articles
            res.render('addresses/index', { title: 'Base de Datos de Direcciones', addresses: addresses});
        }
    }

    async create(req, res, next) {
        console.log(req.method);
        if (req.method === 'POST') {
            await Address.create({
                nombre: req.body.nombre,
                apellidos: req.body.apellidos, 
                telefonoCasa: req.body.telefonoCasa, 
                dirCasa: req.body.dirCasa, 
                telefonoTrabajo: req.body.telefonoTrabajo, 
                dirTrabajo: req.body.dirTrabajo, 
                email: req.body.email
            });
            res.redirect('/addresses');
        }
        else {
            res.render('addresses/create', { title: 'Base de Datos de Direcciones, crear'});
        }
    }

    async update(req, res, next) {
        if (req.method === 'POST') {
            await Address.update(
            {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos, 
                telefonoCasa: req.body.telefonoCasa, 
                dirCasa: req.body.dirCasa, 
                telefonoTrabajo: req.body.telefonoTrabajo, 
                dirTrabajo: req.body.dirTrabajo, 
                email: req.body.email
            },
            {
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/addresses');
        }
        else {
            const address = await Address.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.render('addresses/update', { title: 'Base de Datos de Direcciones, editar', address: address});
        }
    }

    async delete(req, res, next) {
        await Address.destroy({
            where: {
                id: req.params.id
            }
        });
        req.session.flashMessage = 'Se eliminó la publicación';
        res.redirect('/addresses');
    }

}

module.exports = AddressController; // module.exports = ArticlesController
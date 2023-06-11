const Publicacion = require('../models').Publicacion;

class PublicacionController {
    async index(req, res, next) {
        res.render('publicacion/index', { title: 'Base de Datos de Direcciones'});
        /*
        const publicaciones = await Publicacion.findAll();
        console.log("Controller Publicacion: " + publicaciones);
        if (req.session.flashMessage) {
            res.render('publicacion/index', { title: 'Base de Datos de Direcciones', publicaciones: publicaciones, flashMessage: req.session.flashMessage });
        }
        else {
            res.render('publicacion/index', { title: 'Base de Datos de Direcciones', publicaciones: publicaciones});
        }*/
    }

    /*
    async create(req, res, next) {
        console.log(req.method);
        if (req.method === 'POST') {
            await Publicacion.create({
                nombre: req.body.nombre,
                apellidos: req.body.apellidos, 
                telefonoCasa: req.body.telefonoCasa, 
                dirCasa: req.body.dirCasa, 
                telefonoTrabajo: req.body.telefonoTrabajo, 
                dirTrabajo: req.body.dirTrabajo, 
                email: req.body.email
            });
            res.redirect('/publicacion');
        }
        else {
            res.render('publicacion/create', { title: 'Base de Datos de Direcciones, crear'});
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
*/
}

module.exports = PublicacionController;
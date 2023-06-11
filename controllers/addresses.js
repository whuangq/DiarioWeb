const Post = require('../models').Post;

class PostController {
    async index(req, res, next) {
        const posts = await Post.findAll();
        console.log("Controller posts: " + posts);
        if (req.session.flashMessage) {
            res.render('addresses/index', { title: 'Base de Datos de Direcciones', posts: posts, flashMessage: req.session.flashMessage });
        }
        else {
            res.render('addresses/index', { title: 'Base de Datos de Direcciones', posts: posts});
        }
    }

    async create(req, res, next) {
        console.log(req.method);
        if (req.method === 'POST') {
            await Post.create({
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
            await Post.update(
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
            const post = await Post.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.render('addresses/update', { title: 'Base de Datos de Direcciones, editar', post: post});
        }
    }

    async delete(req, res, next) {
        await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        req.session.flashMessage = 'Se eliminó la publicación';
        res.redirect('/addresses');
    }

}

module.exports = PostController;
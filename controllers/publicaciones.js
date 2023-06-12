const Post = require('../models').Post;

class PostController {
    async index(req, res, next) {
        res.render('publicacion/index', { title: 'Base de Datos de Direcciones'});
        
        const posts = await Post.findAll();
        console.log("Controller posts: " + posts);
        if (req.session.flashMessage) {
            res.render('publicacion/index', { title: 'Base de Datos de Direcciones', posts: posts, flashMessage: req.session.flashMessage });
        }
        else {
            res.render('publicacion/index', { title: 'Base de Datos de Direcciones', posts: posts});
        }
    }

    
    async create(req, res, next) {
        console.log(req.method);
        if (req.method === 'POST') {
            await Post.create({
                title: req.body.title,
                date: req.body.date, 
                image: req.body.image, 
                text: req.body.text, 
                author: req.body.author, 
                category: req.body.category, 
                numComments: req.body.numComments
            });
            res.redirect('/publicacion');
        }
        else {
            res.render('publicacion/create', { title: 'Base de Datos de Direcciones, crear'});
        }
    }
    /*
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
*/
}

module.exports = PostController;

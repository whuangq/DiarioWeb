// const Posts = require('../models').Posts;
const { Posts, Comment, Users/*, Category*/ } = require('../models');

class PostsController {
    async index(req, res, next) {
        // res.render('publicacion/index', { title: 'Base de Datos de Direcciones'});
        
        const posts = await Posts.findAll();
        const comments = await Comment.findAll()
        console.log("Controller posts: " + posts);
        if (req.session.flashMessage) {
            res.render('publicaciones/index', { title: 'Base de Datos de Direcciones', posts: posts,  comments : comments, flashMessage: req.session.flashMessage });
        }
        else {
            res.render('publicaciones/index', { title: 'Base de Datos de Direcciones', posts: posts, comments : comments});
        }/**/
    }

    async create(req, res, next) {
        console.log(req.method);
        if (req.method === 'POST') {
            await Posts.create({
                title: req.body.title,
                date: req.body.date, 
                image: req.body.image, 
                text: req.body.text, 
                author: req.body.author, 
                category: req.body.category, 
                numComments: 0
            });
            res.redirect('/publicaciones');
        }
        else {
            res.render('publicaciones/create', { title: 'Crear una nueva publicación'});
        }
    }

    async view(req, res, next) {
        if (req.method === "POST") {
            await Comment.create({
              text: req.body.text,
              postId: req.body.postId,
              date: Date(),
              author: req.body.author,
            });
            res.redirect("/publicaciones/view/" + req.body.postId);
          } else {
            console.log("entered else")
            const post = await Posts.findOne({
              where: {
                id: req.params.id,
              },
            });
            if (post != null) {
                const comments = await Comment.findAll({
                    where: {
                        postId : req.params.id
                    }
                })
                res.render("publicaciones/view", {
                    id : post.id,
                    title: post.title,
                    text: post.text,
                    author : post.author,
                    image : post.image,
                    date : post.date,
                    comments : comments
                });
            } else {
                res.render ("publicaciones/view", {
                    title: "post.title",
                    text: "post.text",
                    author : "post.author",
                    image : "post.image",
                    date : "post.date"
                });
            }
    }}
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

module.exports = PostsController;

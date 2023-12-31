const { Posts, Comment, Users, Category } = require('../models');
const { Sequelize } = require('sequelize');

class PostsController {
    async index(req, res) {
        try {
          const currentPage = req.query.page || 1;
          const limit = 5; // Número máximo de publicaciones por página
      
          const offset = (currentPage - 1) * limit;
      
          const posts = await Posts.findAll({
            order: [['createdAt', 'DESC']],
            limit,
            offset,
          });
    
          const posts1 = await Posts.findAndCountAll({
            order: [['createdAt', 'DESC']],   
            limit,
            offset,
          });

          const authors = await Users.findAll();
      
          const totalPosts = posts1.count;
          const totalPages = Math.ceil(totalPosts / limit);
    
          // Obtener las categorías
          const categories = await Category.findAll();
          
          res.render('publicaciones/index', { posts, currentPage, totalPages, categories, user : req.session, authors });
        } catch (error) {
          console.error(error);
          res.status(500).send('Error al obtener las publicaciones');
        }
      }

      async create(req, res) {
        if (req.method === 'POST') {
            try {
                const { title, date, text, category } = req.body;
                let image = '';
          
                if (req.file) {
                  // Si se proporciona una imagen, obtener el nombre del archivo subido
                  image = 'images/' + req.file.filename;
                }

                const numComments = 0;

                const author = req.session.username;
                const newPost = await Posts.create({ title, date, text, author, category, image, numComments });
          
                res.redirect('/publicaciones'); // Redirecciona a la página principal u otra página después de la creación exitosa
              } catch (error) {
                console.error(error);
                res.status(500).send('Error en la creación de la publicación');
              }
        } else {
            const categories = await Category.findAll();
            res.render('publicaciones/create', { categories , user : req.session });
          }
        
      }

      async delete(req, res, next) {
        await Posts.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.redirect("/admin");
      }

    async view(req, res, next) {
        if (req.method === "POST") {
            const newComment = await Comment.create({
              text: req.body.text,
              postId: req.body.postId,
              date: Date(),
              author: req.body.author,
            });
            
            // Verficar creacion del comentario exitoso
            if (newComment) {
              const affectedRows = await Posts.update(
                { numComments: Sequelize.literal('numComments + 1') },
                { where: { id: req.body.postId } }
              );
              if (affectedRows > 0) {
                console.log('El comentario se creó con éxito.');
              } else {
                console.log('No se pudo actualizar el número de comentarios.');
              }
            } else {
              console.log('No se pudo crear el comentario.');
            }
            
            res.redirect("/publicaciones/view/" + req.body.postId);
          } else {
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
                    numComments: post.numComments,
                    comments : comments,
                    user : req.session
                });
            } else {
                res.render ("publicaciones/view", {
                    title: "post.title",
                    text: "post.text",
                    author : "post.author",
                    image : "post.image",
                    date : "post.date",
                    user : req.session
                });
            }
    }}
}

module.exports = PostsController;

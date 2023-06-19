// const Posts = require('../models').Posts;
const { Posts, Comment, Users, Category } = require('../models');

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
      
          const totalPosts = posts1.count;
          const totalPages = Math.ceil(totalPosts / limit);
    
          // Obtener las categorías
          const categories = await Category.findAll();
          
          res.render('publicaciones/index', { posts, currentPage, totalPages, categories });
        } catch (error) {
          console.error(error);
          res.status(500).send('Error al obtener las publicaciones');
        }
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
// controllers/PostsController.js
const Posts = require('../models/').Posts;
const Category = require('../models/').Category;

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
  
      const totalPosts = posts1.count;
      const totalPages = Math.ceil(totalPosts / limit);

      // Obtener las categorías
      const categories = await Category.findAll();
  
      res.render('publicacion/index', { posts, currentPage, totalPages, categories });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener las publicaciones');
    }
  }
  
  async create(req, res) {
    if (req.method === 'POST') {
        try {
            const { title, date, text, author, category } = req.body;
            let image = '';
      
            if (req.file) {
              // Si se proporciona una imagen, obtener el nombre del archivo subido
              image = 'images/' + req.file.filename;
            }
      
            const newPost = await Posts.create({ title, date, text, author, category, image });
      
            res.redirect('/publicaciones'); // Redirecciona a la página principal u otra página después de la creación exitosa
          } catch (error) {
            console.error(error);
            res.status(500).send('Error en la creación de la publicación');
          }
    } else {
        res.render('publicacion/create', { title: 'Crear una nueva publicación' });
      }
    
  }
}*/
}

module.exports = PostsController;

const { Posts, Comment, Users, Category } = require('../models');

class AdminController {
    async index(req, res) {
        try {
          const currentPage = req.query.page || 1;
          const limit = 5; // Número máximo de publicaciones por página
      
          const offset = (currentPage - 1) * limit;
      
          const posts = await Posts.findAll({
            order: [['createdAt', 'DESC']]
          });
          // Obtener las categorías
          const categories = await Category.findAll();

          // Obtener los autores
          const users = await Users.findAll();
          
          res.render('admin/index', { posts, categories, user : req.session, users });
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
                const author = req.session.username;
                const newPost = await Posts.create({ title, date, text, author, category, image });
          
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

module.exports = AdminController;

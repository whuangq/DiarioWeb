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
}

module.exports = PostsController;

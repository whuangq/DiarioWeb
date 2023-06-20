// controllers/CategoryController.js

const { Posts, Category } = require('../models');

class CategoryController {
  async index(req, res) {
    try {
        const currentPage = req.query.page || 1;
        const limit = 5; // Número máximo de publicaciones por página
      
        const offset = (currentPage - 1) * limit;
        const category = req.params.category;

        // console.log("Category Name: " + category);
    
        const dcategory = await Category.findOne({
          where: { name: category },
          include: {
            model: Posts,
            as: 'posts',
            order: [['createdAt', 'DESC']],
            limit,
            offset,
          },
        });

        // console.log(dcategory.posts);

        const categories = await Category.findAll();
    
        res.render('category/index', { dcategory, categories });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los posts de la categoría');
      }
  }
}

module.exports = CategoryController;

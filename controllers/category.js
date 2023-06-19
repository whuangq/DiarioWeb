// controllers/CategoryController.js

const { Posts, Category } = require('../models');

class CategoryController {
  async index(req, res) {
    try {
        const category = req.params.category;
        console.log("Category Name: " + category);
    
        const dcategory = await Category.findOne({
          where: { name: category },
          include: {
            model: Posts,
            as: 'posts',
          },
        });
    
        res.render('category/index', { dcategory });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los posts de la categoría');
      }
  }
}

module.exports = CategoryController;

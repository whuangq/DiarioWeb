// controllers/CategoryController.js

const { Posts, Category, Users } = require('../models');

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

        const totalPosts = await dcategory.countPosts();
        console.log("totalposts: "+totalPosts);
        const totalPages = Math.ceil(totalPosts / limit);

        const categories = await Category.findAll();

        const authors = await Users.findAll();
    
        res.render('category/index', { dcategory, categories, authors, currentPage, totalPages, user : req.session });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los posts de la categoría');
      }
  }

  async delete(req, res, next) {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/admin");
  }
}

module.exports = CategoryController;

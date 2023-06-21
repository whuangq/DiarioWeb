
const { Posts, Category, Users } = require('../models');

class AuthorsController {
  async index(req, res) {
    try {
        const currentPage = req.query.page || 1;
        const limit = 5; // Número máximo de publicaciones por página
      
        const offset = (currentPage - 1) * limit;
        const usernameInput = req.params.category;
        // console.log("uesrname "+usernameInput);

        const dAuthor = await Users.findOne({
          where: { username: usernameInput },
          include: {
            model: Posts,
            as: 'posts',
            order: [['createdAt', 'DESC']],
            limit,
            offset,
          },
        });

        const totalPosts = await dAuthor.countPosts();
        // console.log("totalposts: "+totalPosts);
        const totalPages = Math.ceil(totalPosts / limit);

        const authors = await Users.findAll();
    
        const categories = await Category.findAll();

        res.render('author/index', { dAuthor, categories, authors, currentPage, totalPages, user : req.session });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los posts del autor');
      }
  }
}

module.exports = AuthorsController;

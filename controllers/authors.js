
const { Posts, Category, Users } = require('../models');

class AuthorsController {
  async index(req, res) {
    try {
        const currentPage = req.query.page || 1;
        const limit = 5; // Número máximo de publicaciones por página
      
        const offset = (currentPage - 1) * limit;
        const username = req.params.username;
        console.log(username)

        const posts = await Posts.findAll({
          where: { author: username }
        });

        const authors = await Users.findAll(
        );
    
        const categories = await Category.findAll();

        res.render('authors/'+ username, { posts, categories, authors });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los posts del autor');
      }
  }
}

module.exports = AuthorsController;

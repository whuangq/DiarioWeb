const { Posts, Comment, Users, Category } = require('../models');

class AdminController {
    async index(req, res) {
        if (req.method === 'POST') {
            try {
                const name = req.body.name;
                await Category.create({name });
          
                res.redirect('/admin');
              } catch (error) {
                console.error(error);
                res.status(500).send('Error en la creación de la publicación');
              }
        }
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


}

module.exports = AdminController;

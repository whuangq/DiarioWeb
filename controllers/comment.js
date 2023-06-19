const { Posts, Comment, Users/*, Category*/ } = require('../models');
var express = require('express');

class CommentController {
    async index(req, res, next) {
        try{
            console.log(req.query.tagid)
        } catch (error) {}
        const comments = await Comment.findAll({
            where: {
                postId : 3
            }
        });
        if (req.session.flashMessage) {
            res.render('comment/index', { title: 'Base de Datos de Direcciones',  comments : comments, flashMessage: req.session.flashMessage });
        }
        else {
            res.render('comment/index', { title: 'Base de Datos de Direcciones', comments : comments});
        }
    }

    
    // async create(req, res, next) {
    //     console.log(req.method);
    //     if (req.method === 'POST') {
    //         await Posts.create({
    //             title: req.body.title,
    //             date: req.body.date, 
    //             image: req.body.image, 
    //             text: req.body.text, 
    //             author: req.body.author, 
    //             category: req.body.category, 
    //             numComments: 0
    //         });
    //         res.redirect('/publicaciones');
    //     }
    //     else {
    //         res.render('publicacion/create', { title: 'Crear una nueva publicación'});
    //     }
    // }
}

module.exports = CommentController;

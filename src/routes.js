const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const DrinksController = require('./controllers/DrinksController');

const routes = express.Router();

// drinks
routes.get('/drinks', DrinksController.index);
routes.get('/details', DrinksController.details);

// add validation middleware
// not working OK with multipart/form-data
/*
routes.post(
    '/drinks', 
    (req, res, next) => { 
        console.log(req.body); next()
    },
    celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        picture: Joi.string().required(),
    })
}), DrinksController.create);
*/
routes.post('/drinks', DrinksController.create);


// tell to node what is exported from this file
module.exports = routes;
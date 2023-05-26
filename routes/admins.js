const { celebrate, Joi } = require('celebrate');
const adminsRouter = require('express').Router();
const { regexforlink, regexforpassword } = require('../utils/regex');
const { login, createUser, logout } = require('../controllers/users');

adminsRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
}), login);

adminsRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(regexforpassword),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexforlink),
  }),
}), createUser);

adminsRouter.delete('/signout', logout);

module.exports = adminsRouter;

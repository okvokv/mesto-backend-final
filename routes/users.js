const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const { regexforlink } = require('../utils/regex');
const {
  getUsers, getUser, getCurrentUser, updateCurrentUser, updateAvatar,
} = require('../controllers/users');

// обработка запроса получения пользователей
usersRouter.get('', getUsers);

// обработка запроса получения данных текущего пользователя
usersRouter.get('/me', getCurrentUser);

// обработка запроса получения данных пользователя по id
usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);

// обработка запроса изменения данных текущего пользователя
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateCurrentUser);

// обработка запроса  изменения аватара текущего пользователя
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexforlink),
  }),
}), updateAvatar);

module.exports = usersRouter;

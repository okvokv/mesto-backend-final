const { celebrate, Joi } = require('celebrate');
const cardsRouter = require('express').Router();
const { regexforlink } = require('../utils/regex');
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

// обработка запроса получения всех карточек
cardsRouter.get('', getCards);

// обработка запроса создания карточки
cardsRouter.post('', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexforlink),
  }),
}), createCard);

// обработка запроса удаления карточки по id
cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

// обработка запроса поставить like
cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), putLike);

// обработка запроса удалить like
cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteLike);

module.exports = cardsRouter;

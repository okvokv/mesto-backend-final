const card = require('../models/cards');
const determineError = require('../middlewares/errors');
const ForbiddenError = require('../middlewares/ForbiddenError');
const NotFoundError = require('../middlewares/NotFoundError');

// получить все карточки
const getCards = (req, res, next) => {
  card.find()
    .then((cards) => res.send(cards))
    .catch((err) => determineError(err, next));
};
// --------------------------------------------------------------------------------
// создать карточку
const createCard = (req, res, next) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;
  card.create({ name, link, ownerId })
    .then((cardData) => res.status(201).send(cardData))
    .catch((err) => determineError(err, next));
};
// ----------------------------------------------------------------------------------
// удалить карточку
const deleteCard = (req, res, next) => {
  // проверка существования карточки  с данным _id в бд
  card.findById(req.params.cardId)
    .then((cardData) => {
      if (cardData) {
        // карточку может удалить только владелец
        const ownerId = cardData.ownerId.toString();
        if (ownerId === req.user._id) {
          card.findByIdAndRemove(req.params.cardId, { ownerId: req.user._id })
            .then(() => {
              res.send({ message: 'Пост удален' });
            })
            .catch((err) => determineError(err, next));
          return;
        }
        next(new ForbiddenError());
        return;
      }
      next(new NotFoundError('card'));
    })
    .catch((err) => determineError(err, next));
};

// поставить like
const putLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // текущий пользователь может поставить лайк
    // если в массиве его нет
    { new: true },
  )
    .then((cardData) => {
      // проверка существования карточки с данным _id в бд
      if (cardData) {
        res.send(cardData);
        return;
      }
      next(new NotFoundError('card'));
    })
    .catch((err) => determineError(err, next));
};

// удалить like
const deleteLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // текущий пользователь может удалить лайк
    // если в массиве он уже есть
    { new: true },
  )
    .then((cardData) => {
      // проверка существования карточки с данным _id в бд
      if (cardData) {
        res.send(cardData);
        return;
      }
      next(new NotFoundError('card'));
    })
    .catch((err) => determineError(err, next));
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};

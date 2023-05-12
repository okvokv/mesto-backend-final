// промежуточный файл подключения роутеров
const router = require('express').Router();
const auth = require('../middlewares/auth');
const adminsRouter = require('./admins');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../middlewares/NotFoundError');

// подключение роутеров
router.use('/', adminsRouter);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', auth, ((req, res, next) => next(new NotFoundError('root'))));

module.exports = router;

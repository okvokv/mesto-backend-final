// итоговый обработчик ошибок
function finalErrorHandler(err, req, res, next) {
  const { statusCode = 500, message } = err;
  console.log('fError:', statusCode, message);
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
}

module.exports = finalErrorHandler;

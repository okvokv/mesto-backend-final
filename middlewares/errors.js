const ValidationError = require('./ValidationError');
const WrongEmailError = require('./WrongEmailError');

// определение типа ошибки
function determineError(err, next) {
  console.log(err);
  if (err.message.includes('Validation')) {
    return next(new ValidationError(''));
  }
  if (err.name === 'CastError') {
    return next(new ValidationError('cast'));
  }
  if (err.message.includes('E11000')) {
    return next(new WrongEmailError());
  }
  return next(err);
}

module.exports = determineError;

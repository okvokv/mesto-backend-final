class WrongEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = 'WrongEmailError';
    this.message = 'Пользователь с таким email уже существует';
  }
}

module.exports = WrongEmailError;

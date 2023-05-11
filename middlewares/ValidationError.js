class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
    if (message.includes('cast')) {
      this.message = 'Передан некорректный id';
      return;
    }
    this.message = 'Ошибка валидации. Переданы некорректные данные';
  }
}

module.exports = ValidationError;

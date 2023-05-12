class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
    // ветвление в пределах ошибки одного типа
    if (message.includes('user')) {
      this.message = 'Запрашиваемый пользователь не найден';
      return;
    }
    if (message.includes('cards')) {
      this.message = 'Запрашиваемая карточка не найдена';
      return;
    }
    if (message.includes('root')) {
      this.message = 'Ошибка маршрутизации';
      return;
    }
    this.message = 'Объект не найден';
  }
}

module.exports = NotFoundError;

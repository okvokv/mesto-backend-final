const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const finalErrorHandler = require('./middlewares/finalErrorHandler');
const config = require('./config');
const routes = require('./routes');
const { requestsLogger, errorsLogger } = require('./middlewares/logger');

// назначение порта сервера
const { PORT } = config;

// подключение серверного модуля для интерпретации файла
const app = express();

// подключение базы данных
mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// сборка приходящих cookies
app.use(cookieParser());
// сборка объекта из JSON-формата
app.use(express.json());

// подключение логгера запросов
app.use(requestsLogger);

// обработчик CORS
app.use(cors());

// реализация возможности краш-теста при запросе на роут, потом удалить
app.get('/crash-test', () => {
  setTimeout(() => { throw new Error('Сервер сейчас упадёт'); }, 0);
});

// подключение роутеров
app.use(routes);

// подключение логгера ошибок (после обр. запросов, до обр. ошибок)
app.use(errorsLogger);

// обработчик ошибок celebrate
app.use(errors());

// обработчик остальных ошибок
app.use(finalErrorHandler);

// включение прослушивания  порта
app.listen(PORT, () => {
  console.log(`App server listening at: http://localhost:${PORT}`);
});

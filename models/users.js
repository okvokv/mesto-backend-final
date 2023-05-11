const mongoose = require('mongoose');
const validator = require('validator');
const { regexforlink } = require('../utils/regex');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator(email) { return validator.isEmail(email); },
      },
      message: 'Ошибка валидации email',
    },
    password: {
      select: false,
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
      validate: {
        validator(name) { return name.length >= 2 && name.length <= 30; },
      },
      message: 'Ошибка валидации name',
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
      validate: {
        validator(about) { return about.length >= 2 && about.length <= 30; },
      },
      message: 'Ошибка валидации about',
    },
    avatar: {
      type: String,
      // type: mongoose.SchemaTypes.Url,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(avatar) {
          return regexforlink.test(avatar);
        },
        message: 'Ошибка валидации ссылки',
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);

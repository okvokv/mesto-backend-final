// регулярное выражение для валидации ссылок
// const regexforlink = /^\s*(https?:\/\/)\S+\s*$/; любой url
const regexforlink = /^\s*(https?:\/\/)\S+\.\S+\s*$/;
// регулярное выражение для валидации пароля
const regexforpassword = /^[^а-яА-Я\s]{8,30}\s*$/;

module.exports = { regexforlink, regexforpassword };

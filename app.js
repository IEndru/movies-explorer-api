require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
// Слушаем 3000 порт
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();
// Подключение к MongoDB
mongoose.connect(DB_URL)
  .then(() => {
    console.log('Подключение к MongoDB успешно установлено');
  })
  .catch((error) => {
    console.log('Ошибка при подключении к MongoDB:', error);
  });

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})

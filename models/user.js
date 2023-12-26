const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    email: {
      type: String,
      required: {
        value: true,
        message: 'Поля email является обязательным',
      },
      unique: true,
      validate: {
        validator(v) {
          return isEmail(v);
        },
        message(props) {
          return `${props.value} Невалидный формат email!`;
        },
      },
    },
    password: {
      type: String,
      required: {
        value: true,
        message: 'Поля password является обязательным',
      },
      select: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const User = mongoose.model('user', userSchema);

module.exports = { User };

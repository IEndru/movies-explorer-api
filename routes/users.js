const express = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  updateUser,
  getUserInfo,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/me', getUserInfo);

userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).trim(),
      email: Joi.string().required().email(),
    }),
  }),
  updateUser,
);

module.exports = { userRouter };

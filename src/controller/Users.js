const db = require('../../models');
const { users : user } = require('../models');
const users = require('../models/user');
const Op = db.sequelize.user;
const controller = {};

controller.register = async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    await users.create(newUser);
  
    return res.status(201).json({
      message: 'Berhasil mendaftarkan user baru.',
      user_email: newUser.email
    })
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({
        message: err.message || 'Internal server error.',
      })
  }
}

controller.updatePassword = async (req, res) => {
  try {
    await users.update({ password: req.body.password }, {
      where: {
        id: req.body.id
      }
    });
  
    return res.status(200).json({
      message: 'Berhasil merubah password.'
    })
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({
        message: err.message || 'Internal server error.',
      })
  }
}

controller.login = async (req, res) => {
  try {
    let customer = await user.findOne({
      attributes: ['id', 'name', 'email'],
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })

    customer = customer?.dataValues;

    if (!customer) throw {
      status: 400,
      message: 'Username atau password tidak sesuai.'
    }
  
    return res.status(201).json({
      message: 'Berhasil login.',
      user: req.body.email
    })
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({
        message: err.message || 'Internal server error.',
      })
  }
}

module.exports = controller;

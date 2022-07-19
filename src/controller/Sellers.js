const db = require('../../models')
const Sellers = db.Sellers;
const Op = db.Sequelize.Op;
const { validateText } = require('../../helpers/bcrypt');
const { encode } = require('../../helpers/jwt');
const controller = {};

controller.register = async (req, res) => {
    try {
        await Sellers.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 2,
        })
        .then(() => {
            res.status(201).send("Seller successfully registered")
        })
    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Internal server error"
          });
    }
}

controller.login = async (req, res) => {
    try {
      let seller = await Sellers.findOne({
        attributes: ['id', 'name', 'email'],
        where: {
          email: req.body.email,
          password: req.body.password
        }
      })
  
      seller = seller?.dataValues;
  
      if (!seller) throw {
        status: 400,
        message: 'Seller not found.'
      }
    
      return res.status(201).json({
        message: 'Successfully login as seller',
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
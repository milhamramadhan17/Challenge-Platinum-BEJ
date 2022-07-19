const db = require('../../models')
const Customers = db.Customers;
const Op = db.Sequelize.Op;
const { validateText, hash } = require('../../helpers/bcrypt');
const { encode } = require('../../helpers/jwt');
const controller = {};



controller.register = async (req, res) => {
  try {
      const customer = {
          user_id       : req.body.user_id,
      }

      await Customers.create(customer)
      .then(() => {
          res.status(201).send("Customer added successfully")
      })
  } 

  catch (err) {
    return res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error' })
  }
}

controller.getAll = async (req, res) => {
  const dataCustomer = req.query.dataCustomer;
  const condition = dataCustomer ? { dataCustomer: { [Op.like]: `%${req.query.dataCustomer}%` } } : null;
  try {
      await Customers.findAll({
          where: condition
      })
      .then(results => {
          res.send(results)
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
    let customer = await Customers.findOne({
      attributes: ['id', 'name', 'email'],
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })

    customer = customer?.dataValues;

    if (!seller) throw {
      status: 400,
      message: 'Customer not found.'
    }
  
    return res.status(201).json({
      message: 'Successfully login as customer',
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

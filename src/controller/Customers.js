const db = require('../../models')
const Customers = db.Customer;
const Op = db.Sequelize.Op;
const controller = {};


controller.addCustomer = async (req, res) => {
  try {
      if (!req.body.name) throw {
          status: 400,
          message: 'Name cannot be empty'
        }
  
        if (!req.body.price) throw {
          status: 400,
          message: 'Price cannot be empty'
        }

      const customer = {
          name       : req.body.name,
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

controller.updateCustomer = async (req, res) => {
try {
  await Customers.update({ 
    category: req.body.category
     }, 
     {
    where: {
      id: req.body.id
    }
  });

  return res.status(200).json({
    message: 'Successfully updating category'
  })
} catch (err) {
  return res.status(err.status || 500).json({
      message: err.message || 'Internal server error.',
    })
}
}

controller.deleteCustomer = async (req, res) => {
try {
  if (!req.body.id) 
  throw { status: 400, 
    message: 'ID cannot be empty' 
  };

  await Customers.destroy({
    where: { id: req.body.id }
  });

  return res.status(200).json({
    message: 'Successfully deleting customer ' + req.body.id
  })
} catch (err) {
  return res
    .status(err.status ||  500)
    .json({ message: err.message || 'Internal server error' })
}
}

module.exports = controller;

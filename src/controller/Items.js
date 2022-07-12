const db = require('../../models')
const Items = db.Items;
const Op = db.Sequelize.Op;
const controller = {};

controller.addItem = async (req, res) => {
    try {
        if (!req.body.name) throw {
            status: 400,
            message: 'Name cannot be empty'
          }
    
          if (!req.body.price) throw {
            status: 400,
            message: 'Price cannot be empty'
          }

        const item = {
            name       : req.body.name,
            price      : req.body.price,
            store_name : req.body.store_name,
            category   : req.body.category,
            brand      : req.body.brand,
        }

        await Items.create(item)
        .then(() => {
            res.status(201).send("Item added successfully")
        })
    } 

    catch (err) {
      return res
        .status(err.status || 500)
        .json({ message: err.message || 'Internal server error' })
    }
}

controller.getAll = async (req, res) => {
  const dataItems = req.query.dataItems
    var condition = dataOrders ? {dataItems: {[Op.like]: `%${dataItems}%`} } : null;
    try {
        await Items.findAll({
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

controller.getByID = async (req, res) => {
  const id = req.params.id;
    try {
        await Items.findByPk(id)
        .then(results => {
            if (results) {
                res.status(200).send(results);
            } 
            else {
                res.status(404).send({
                    message: `Item with id ${id} cannot be found.`
                });
            };
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving Item with id = " + id
          });
    }
}

controller.updateItem = async (req, res) => {
  try {
    await Items.update({ 
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

controller.deleteItem = async (req, res) => {
  try {
    if (!req.body.id) 
    throw { status: 400, 
      message: 'ID cannot be empty' 
    };

    await Items.destroy({
      where: { id: req.body.id }
    });

    return res.status(200).json({
      message: 'Successfully deleting item ' + req.body.id
    })
  } catch (err) {
    return res
      .status(err.status ||  500)
      .json({ message: err.message || 'Internal server error' })
  }
}

module.exports = controller;
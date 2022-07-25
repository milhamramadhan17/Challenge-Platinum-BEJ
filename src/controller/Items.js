const db = require('../../models')
const Items = db.Items;
const Op = db.Sequelize.Op;
const controller = {};

controller.addItem = async (req, res) => {
    try {
        if (!req.body.name) throw {
            err: 'Name cannot be empty'
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
            res.status(201).send({
                status  : 201,
                message : "Item added successfully"
            });
        })
    } 

    catch (err) {
        next(err);
      }
    }

controller.getAll = async (req, res) => {
  const dataItems = req.query.dataItems
    var condition = dataItems ? {dataItems: {[Op.like]: `%${dataItems}%`} } : null;
    try {
        await Items.findAll({
            where: condition
        })
        .then(results => {
            res.send(results)
        })
    } catch (err) {
        next(err);
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
    } catch (err) {
        next(err);
      }
    }


controller.updateItems = async (req, res) => {
  try {
      const items = {
          name        : req.body.name,
          price       : req.body.price,
          store_name  : req.body.store_name,
          category    : req.body.category,
          brand       : req.body.brand,
      }
       await Items.update(items,{
           where: {
               id: req.params.id
           }
       });
       
       return res.status(203).json(
           {
            status : 203,
            message: "Updated Successfully"
       });
  } catch (err){
      res.status(404).send({
           message:
           err.message || "There's something wrong"
      })
  }
}

controller.deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        await Items.findByPk(id)
        .then(results => {
            if(results) {
                Items.destroy({
                    where: {
                        id: id
                    }
                })
                .then((results) => {
                    res.send({
                        status: 204,
                        msg: "item deleted successfully"
                    });
                })
            } else {
                res.status(404).send({
                    status: 404,
                    msg: "Cannot find item with id 6f0c8067-c045-4c3c-b10f-fe8e12fb52cd."
                });
            }
        })

    } catch (err) {
        res.status(400).send({
            message:
            err.message || "There is something wrong"
        })
    }
    
}

module.exports = controller;
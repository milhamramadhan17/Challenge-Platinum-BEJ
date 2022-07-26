const db = require('../../models')
const { upload } = require('../../helpers/upload')
const fs = require('fs');
const Items = db.Items;
const Op = db.Sequelize.Op;
const controller = {};

controller.addItem =  async (req, res, next) => {
    const { name, price, store_name, category, brand, photo } = req.body;
    await Items.findOne({
        where: {
        name: name}
    })
    .then(results => {
        if(results) throw {error: 'item already exists.'} 
        else {
            const filePath = './files/' + req.filePath;
            return upload(filePath)
            .then((url) => {
               return Items.create({
                name: req.body.name,
                price: req.body.price,
                store_name: req.body.store_name,
                category: req.body.category,
                brand: req.body.brand,
                photo: url
                })
                .then(() => {
                    res.status(201).send({
                        status: 201,
                        message: 'Item added successfully'
                    });
                })
            })
            
        }
    })
.catch (err => next(err));
}
    

controller.getAll = async (req, res, next) => {
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

controller.getByID = async (req, res, next) => {
  const id = req.params.id;
    try {
        await Items.findByPk(id)
        .then(results => {
            if (results) {
                res.status(200).send(results);
            } 
            else {
                res.status(404).send({
                    status : 404,
                    message: `Item with id ${id} cannot be found.`
                });
            };
        });
    } catch (err) {
            next(err);   
    }
    }


controller.updateItems = async (req, res, next) => {
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
               "message": "Updated Successfully"
       });
  } catch (err){
    next(err);   
}
}

controller.deleteItem = async (req, res, next) => {
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
                        msg: "Deleted Successfully"
                    });
                })
            } 
        })
    } catch (err) {
        next(err);   
} 
}

module.exports = controller;
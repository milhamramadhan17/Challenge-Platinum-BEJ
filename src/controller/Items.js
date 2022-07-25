const db = require('../../models')
const { upload } = require('../../helpers/upload')
const fs = require('fs');
const Items = db.Items;
const Op = db.Sequelize.Op;
const controller = {};

controller.addItem =  async (req, res, next) => {
    const { name, price, store_name, category, brand,photo } = req.body;
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
                        message: 'Item be added'
                    });
                })
            })
            
        }
    })
.catch (err => next(err));
}

// controller.addItem = async (req, res, next) => {
//     try {

//       for (let i = 0; i < req.files; i++) {
//         const uploadRes = await upload(req.files[i].path);

//         await Image.create({
//           url: uploadRes.secure_url,
//           item_id: newItemID,
//           asset_id: uploadRes.asset_id,
//           public_id: uploadRes.public_id
//         })
//       }

//       await Items.create({
        // name: req.body.name,
        // price: req.body.price,
        // store_name: req.body.store_name,
        // category: req.body.category,
        // brand: req.body.brand,
        // photo: 'url'
//       })

//       return res.status(201).json({
//         status: 201,
//         message: 'Berhasil membuat item',
//       })
//     } catch (err) {
//       next(err);
//     }
//   }

    

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
               "message": "Updated Successfully"
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
                        msg: "Deleted Successfully"
                    });
                })
            } else {
                res.status(404).send({
                    status: 404,
                    msg: "Cannot find Item with id"
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
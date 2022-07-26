const db = require('../../models')
const Orders = db.Orders;
const Items = db.Items;
const Op = db.Sequelize.Op;
const controller = {};

controller.getAll = async (req, res) => {
    const dataOrders = req.query.dataOrders
    var condition = dataOrders ? {dataOrders: {[Op.like]: `%${dataOrders}%`} } : null;
    try {
        await Orders.findAll({
            where: condition
        })
        .then(results => {
            res.send(results)
        })
    } catch (err) {
        next(err)
    }
}

controller.addOrder = async (req, res) => {
    try {
        const orderItem = await Items.findOne({
            where: {
                 id: req.body.item_id
            }
        })
        const order = {
            customer_id   : req.body.customer_id,
            item_id       : req.body.item_id,
            qty           : req.body.qty,
            amount        : req.body.qty * orderItem.dataValues.price,
            status        : req.body.status,
            payment_method: req.body.payment_method,
        }
    
        await Orders.create(order)
        .then(() => {
            res.status(201).send({
                status: "201",
                message: "Added order is successfully"
            })
        })

    } catch (err) {
        res.status(500).send({
            message:
            err.message || "There are'nt data in database"
        })
    }
}

controller.getOrderById = async (req, res) => {
    const id = req.params.id;
    try {
        await Orders.findByPk(id)
        .then(results => {
            if (results) {
                res.send(results);
            } else {
                res.status(404).send({
                    message: `Cannot find Order with id ${id}.`
                });
            };
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving Order with id = " + id
          });
    }
}

controller.updateOrder = async (req, res) => {
    try {
        const orderItem = await Items.findOne({
            where: {
                 id: req.body.item_id
            }
        })
        const order = {
            customer_id   : req.body.customer_id,
            item_id       : req.body.item_id,
            qty           : req.body.qty,
            amount        : req.body.qty * orderItem.dataValues.price,
            status        : req.body.status,
            payment_method: req.body.payment_method,
        }
         await Orders.update(order,{
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

controller.deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        await Orders.findByPk(id)
        .then(results => {
            if(results) {
                Orders.destroy({
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
                    msg: "Cannot find Order with id " + id
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
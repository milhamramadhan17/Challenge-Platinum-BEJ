const db = require('../../models')
const Admins = db.Admins;
const Op = db.Sequelize.Op;
const { validateText } = require('../../helpers/bcrypt');
const { encode } = require('../../helpers/jwt');
const controller = {};

controller.getAll = async (req, res) => {
    const dataAdmin = req.query.dataAdmin;
    const condition = dataAdmin ? { dataAdmin: { [Op.like]: `%${dataAdmin}%` } } : null;
    try {
        await Admins.findAll({
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

controller.register = async (req, res) => {
    try {
        await Admins.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 1,
        })
        .then(() => {
            res.status(201).send("Admin added successfully")
        })
    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Internal server error"
          });
    }
}

module.exports = controller;
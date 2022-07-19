const db = require('../../models')
const Admins = db.Admins;
const Op = db.Sequelize.Op;
const { validateText, hash } = require('../../helpers/bcrypt');
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
    const { name, email, password, role } = req.body;
    try{
        await Admins.findOne({
            where: {
                email: email
            }
        })
        .then(results => {
            if(results){
                return res.status(401).send({
                    message: 'Email already exists'
                });
            } else {
                Admins.create({
                    name: name,
                    email: email,
                    password: password,
                    role: role
                })
                .then(results => {
                    res.status(201).send({
                        message: 'Register successfully'
                    });
                })
            }
        })
    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Internal server error"
          });
    }
}

controller.login = async (req, res) => {
    const {email} = req.body;
    try {
        await Admins.findOne({
            where: {
                email: email
            }
        })
        .then(results => {
            console.log(results);
            console.log(results.dataValues);
            if(results){
                if(validateText(req.body.password, results.dataValues.password)){
                    const token = encode({
                        id: results.id,
                        name: results.name,
                        email: results.email,
                        role: results.role
                    });
                    res.status(200).send({
                        message: 'Login successfully',
                        token: token
                    });
                } else {
                    res.status(401).send({
                        status: 401,
                        message: 'Password is incorrect'
                    });
                }
            } else {
                res.status(401).send({
                    status: 401,
                    message: 'Email is incorrect'
                });
            }
        })
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Internal server error"
        });
    }
}

module.exports = controller;
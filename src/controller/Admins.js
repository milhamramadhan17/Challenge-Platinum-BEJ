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
    const Admin = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }
    try {
        await Admins.findOne({
            where: {
                email: Admin.email
            }
        })
        .then(results => {
            if (results) {
                res.status(401).send({
                    status: '401',
                    message: 'Email already exists'
                });
            } else {
                Admins.create(Admin)
                .then(() => {
                    res.status(201).json({
                        status: 201,
                        message: 'Admin added successfulld'
                    })
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
   Admins.findOne({
         where: {
                email: req.body.email
         }
    })
    .then((admin) => {
        if (!admin) throw {
            status: 401,
            message: 'Email not found'
        }

        const valid = validateText(req.body.password, admin.password);
        if (!valid) throw {
            status: 401,
            message: 'Password is incorrect'
        }
        
        res.header('Authorization', encode(admin)).json({
            encode: encode(admin),
        });

    })
    .catch((err) => {
        res.status(err.status).send({
            message: err.message || "Internal server error"
        });
    })
}

module.exports = controller;
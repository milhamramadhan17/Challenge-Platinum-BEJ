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
    const hashPassword = hash(password);
    
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
                    password: hashPassword,
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
    try{
        Admins.findOne({
            where: {
                email: req.body.email,
            }
        });
    
        const isValid = validateText(req.body.password, Admins.dataValues.password);
        if (!isValid) {
            return res.status(401).send({
                message: 'Invalid email or password'
            });
        }
        const name = Admins.dataValues.name;
        const email = Admins.dataValues.email;
        const role = Admins.dataValues.role;
        const token = encode({ name, email, role }, {
            expiresIn: '20s'
        });

        const refreshToken = encode({ name, email, role }, {
            expiresIn: '1d'
        });

        await Admins.update({
            refreshToken: refreshToken
        }, {
            where: {
                email: email,
            }
        });
        res.json({
            status: 200,
            message: 'Login successfully',
            token: token,
            refreshToken: refreshToken
        });
        
    }
    catch(err){
        res.status(500).send({
            message:
              err.message || "Internal server error"
          });
    }
}


module.exports = controller;
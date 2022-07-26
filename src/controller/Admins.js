const fs = require('fs');
const db = require('../../models')
const Admins = db.Admins;
const Op = db.Sequelize.Op;
const { upload } = require('../../helpers/upload');
const { validateText} = require('../../helpers/bcrypt');
const { encode } = require('../../helpers/jwt');
const controller = {};

controller.getAll = async (req, res,) => {
    const dataAdmin = req.query.dataAdmin;
    const condition = dataAdmin ? { dataAdmin: { [Op.like]: `%${dataAdmin}%` } } : null;
        await Admins.findAll({
            where: condition
        })
        .then(results => {
            res.send(results)
        })
        
}

controller.register = async (req, res, next) => {
    const { name, email, password} = req.body;
        await Admins.findOne({
            where: {
                email: email
            }
        })
        .then(results => {
            if(results) throw {error: 'Email is already exist'} 
            else {
                const filePath = './files/' + req.filePath;
                return upload(filePath)
                .then((url) => {
                   return Admins.create({
                        name: name,
                        email: email,
                        password: password,
                        role: 1,
                        profile: url
                    })
                    .then(() => {
                        res.status(201).send({
                            status: "201",
                            message: 'Register successfully'
                        });
                    })
                })
                
            }
        })

    .catch (err => next(err));
}

controller.login = async (req, res, next) => {
    const { email, password } = req.body;
        await Admins.findOne({
            where: {
                email: email
            }
        })
        .then(results => {
            console.log(results)
            if(results){
                if(validateText(password, results.password)){
                    const token = encode({
                        id: results.id,
                        email: results.email,
                        role: results.role
                    });
                    res.status(200).send({
                        message: 'Login successfully',
                        token: token
                    });
                } else {throw {error: 'password is incorrect'}}
            } else {
                throw {error: 'Email is incorrect'}
            }
        })
    .catch (err => next(err));
}


module.exports = controller;
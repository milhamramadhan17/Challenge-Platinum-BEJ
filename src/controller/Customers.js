const db = require('../../models')
const fs = require('fs');
const Customers = db.Customers;
const Op = db.Sequelize.Op;
const { upload1 } = require('../../helpers/upload');
const { validateText, hash } = require('../../helpers/bcrypt');
const { url } = require('../../config/cloudinary.config');
const controller = {};

controller.register = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    await Customers.findOne({
        where: {
            email: email
        }
    })
    .then(results => {
        if(results) throw {error: 'Email is already exist'} 
        else {
            const filePath = './files/' + req.filePath;
            return upload1(filePath)
            .then((url) => {
               return Customers.create({
                    name: name,
                    email: email,
                    password: password,
                    role: 3,
                    photo: url
                })
                .then(() => {
                    res.status(200).send({
                        status: 201,
                        message: 'Register successfully'
                    });
                })
            })
            
        }
    })

.catch (err => next(err));
}
  
controller.login = async (req, res, next) => {
    const {email} = req.body;
   
        await Customers.findOne({
            where: {
                email: email
            }
        })
        .then(results => {
            if(results){
                if(validateText(req.body.password, results.dataValues.password)){
                    const token = encode({
                        id: results.id,
                        name: results.name,
                        email: results.email,
                        role: results.role
                    });
                    res.status(201).send({
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


controller.getAll = async (req, res) => {

  const dataCustomer = req.query.dataCustomer;
  const condition = dataCustomer ? { dataCustomer: { [Op.like]: `%${req.query.dataCustomer}%` } } : null;
  await Customers.findAll({
    where: condition
})
.then(results => {
    res.send(results)
})

}

module.exports = controller;
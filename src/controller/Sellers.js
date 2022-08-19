const db = require('../../models');
const fs = require('fs');
const Sellers = db.Sellers;
const Op = db.Sequelize.Op;
const { upload1 } = require('../../helpers/upload');
const { validateText, hash } = require('../../helpers/bcrypt');
const { encode } = require('../../helpers/jwt');
const { sendMail } = require('../../helpers/nodemailer');
const controller = {};

controller.register = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    await Sellers.findOne({
        where: {
            email: email}
    })
    .then(results => {
        if(results) throw {error: 'Email already exists.'} 
        else {
            const filePath = './files/' + req.filePath;
            return upload1(filePath)
            .then((url) => {
               return Sellers.create({
                    name: name,
                    email: email,
                    password: password,
                    role: 2,
                    photo: url
                })
                .then(() => {
                    res.status(201).send({
                        status: 201,
                        message: 'Seller successfully registered'
                    });
                })
            })
            
        }
    })
.catch (err => next(err));
}
  
controller.login = async (req, res, next) => {
    const { email, password } = req.body;
        await Sellers.findOne({
            where: {email: email}
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
                    const templateEmail = {
                        from: 'Admin',
                        to: results.email,
                        subject: 'Seller Login Successfully',
                        text: 'Keep the token for sign in. Token: ' + token
                    }
                    sendMail(templateEmail)
                    return res.status(200).send({
                        status: 200,
                        message: 'Successfully login. Check your email',
                    });
                } else {throw {error: 'Password is incorrect'}}
            } 
            else {
                throw {error: 'Email is incorrect'}
            }
        })
    .catch (err => next(err));
}

controller.getAll = async (req, res) => {

    const allSellers = req.query.allSellers;

    const condition = allSellers ? { allSellers: { [Op.like]: `%${allSeller}%` } } : null;
    await Sellers.findAll({
      where: condition
  })
  .then(results => {
      res.send(results)
  })
  }

module.exports = controller;

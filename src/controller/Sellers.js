const db = require('../../models')
const Sellers = db.Sellers;
const Op = db.Sequelize.Op;
const { validateText, hash } = require('../../helpers/bcrypt');
const { encode } = require('../../helpers/jwt');
const controller = {};

controller.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashPassword = hash(password);

    try {
        await Sellers.create({
            name: name,
            email: email,
            password: hashPassword,
            role: 2,
        })
        .then(() => {
            res.status(201).send("Seller successfully registered")
        })
    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Internal server error"
          });
    }
}

controller.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        await Sellers.findOne({
            where: {email: email}
        })

        .then(results => {
            if(results){
                if(validateText(password, results.password)){
                    const token = encode({
                        id: results.id,
                        email: results.email,
                        role: results.role
                    });
                    res.status(200).send({
                        message: 'Successfully log in as seller',
                        token: token
                    });
                } else {
                    res.status(401).send({
                        message: 'Password is incorrect'
                    });
                }
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

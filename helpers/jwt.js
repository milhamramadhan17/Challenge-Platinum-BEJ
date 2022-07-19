const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const encode = (data) => {
<<<<<<< HEAD
    return jwt.sign(data, secretKey, { expiresIn: 60 * 60 });
=======
    return jwt.sign(data, secretKey);
>>>>>>> 20275fa53674cb208333da73a77871443b0e5b39
}

const decode = (token) => {
    return jwt.verify(token, secretKey);
}

module.exports = {
    encode,
    decode
}
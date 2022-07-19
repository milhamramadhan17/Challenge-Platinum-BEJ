const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

const hash = (text) => {
<<<<<<< HEAD
  return bcrypt.hashSync(text, salt);
}

const validateText = (text, hash) => {
  bcrypt.compareSync(text, hash);
}

module.exports = {
  hash,
  validateText
=======
    return bcrypt.hashSync(text, salt);
}

const validateText = (text, hash) => {
    return bcrypt.compareSync(text, hash);
}

module.exports = {
    hash,
    validateText
>>>>>>> 20275fa53674cb208333da73a77871443b0e5b39
}
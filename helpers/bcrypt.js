const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

const hash = (text) => {
    return bcrypt.hashSync(text, salt);
}

const validateText = (text, hash) => {
    return bcrypt.compareSync(text, hash);
}

module.exports = {
    hash,
    validateText
}
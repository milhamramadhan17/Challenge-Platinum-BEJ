const router = require('express').Router();
const customerController = require('../controllers/Customers');

router.post('/register', customerController.register);
router.post('/login', customerController.login);
router.put('/password', customerController.updatePassword);

module.exports = router;

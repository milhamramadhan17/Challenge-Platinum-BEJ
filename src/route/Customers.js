const router = require('express').Router();
const controller = require('../controller/Customers');

router.post('/api/customer/register', controller.register);
router.post('/api/customer/login', controller.login);


router.get('/customers', controller.getAll);


module.exports = router;

const router = require('express').Router();
const controller = require('../controller/Customers');

router.post('/api/customer/register', controller.register);
router.post('/api/customer/login', controller.login);



router.get('/customers', authentication, authorization.customer, controller.getAll);


module.exports = router;

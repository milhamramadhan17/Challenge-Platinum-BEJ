const router = require('express').Router();
const controller = require('../controller/Customers');
const { authentication, authorization } = require('../middleware/auth');

router.post('/api/customer/register', controller.register);
router.post('/api/customer/login', controller.login);



router.get('/customers', authentication, authorization.Customers, controller.getAll);


module.exports = router;

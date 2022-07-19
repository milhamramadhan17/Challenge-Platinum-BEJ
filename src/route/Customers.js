const router = require('express').Router();
const controller = require('../controller/Customers');
const { authentication, authorization } = require('../../middleware/auth');

router.post('/register', controller.register);
router.post('/login', controller.login);



router.get('/customers', authentication, authorization.Customers, controller.getAll);


module.exports = router;

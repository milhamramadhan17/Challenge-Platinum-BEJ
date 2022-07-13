const router = require('express').Router();
const controller = require('../controller/Items');

router.post('/customers', controller.addCustomer);
router.get('/customers', controller.getAllcustomer);
router.put('/customers', controller.updateCustomer);
router.delete('/customers', controller.deleteCustomer);

module.exports = router;

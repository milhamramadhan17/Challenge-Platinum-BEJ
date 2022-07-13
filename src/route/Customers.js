const router = require('express').Router();
const controller = require('../controller/Customers');

router.get('/customers', controller.getAllcustomer);
router.post('/addCustomers', controller.addCustomer);
router.put('/customers/:id', controller.updateCustomer);
router.delete('/customers/:id', controller.deleteCustomer);

module.exports = router;

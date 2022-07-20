const controller = require('../controller/Orders');
const router = require('express').Router();
const { authentication, authorization } = require('../../middleware/auth');

router.use(authentication);
router.get('/orders', (authorization.Customers || authorization.Sellers), controller.getAll);
router.post('/addOrders', authorization.Customers, controller.addOrder);
router.get('/orders/:id', (authorization.Customers || authorization.Sellers) , controller.getOrderById);
router.put('/orders/:id',authorization.Customers, controller.updateOrder);
router.delete('/orders/:id', authorization.Customers, controller.deleteOrder);


module.exports = router;
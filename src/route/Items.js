const router = require('express').Router();
const controller = require('../controller/Items');
const { authentication, authorization } = require('../../middleware/auth');

router.use(authentication)

router.post('/items', authorization.Sellers, controller.addItem);
router.get('/items', controller.getAll);
router.get('/items/:id', controller.getByID);
router.put('/items/:id', controller.updateItems);
router.delete('/items/:id', authorization.Sellers, controller.deleteItem);

module.exports = router; 

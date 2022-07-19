const router = require('express').Router();
const controller = require('../controller/Items');
const { authentication, authorization } = require('../../middleware/auth')

router.post('/items', authentication, authorization.seller, controller.addItem);
router.get('/items', controller.getAll);
router.get('/items/:id', controller.getByID);
router.put('/items/:id', controller.updateItems);
router.delete('/items/:id', authentication, authorization.seller, controller.deleteItem);

module.exports = router; 
const router = require('express').Router();
const userController = require('../controllers/Users');

router.post('/register', userController.register);
router.put('/password', userController.updatePassword);
router.post('/login', userController.login);

module.exports = router;

const router = require('express').Router();
const controller = require('../controller/Admins');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/admins', controller.getAll);


module.exports = router;

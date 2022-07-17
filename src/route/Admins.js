const router = require('express').Router();
const controller = require('../controller/Admins');

router.post('/admins', controller.register);
router.get('/admins', controller.getAll);


module.exports = router;

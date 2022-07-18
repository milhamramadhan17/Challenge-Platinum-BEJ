const router = require('express').Router();
const controller = require ('../controller/Sellers');

router.post('/sellers', controller.register);
router.get('/sellers', controller.login);

module.exports = router;
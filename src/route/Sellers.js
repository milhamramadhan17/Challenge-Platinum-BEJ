const router = require('express').Router();
const controller = require ('../controller/Sellers');

router.post('/sellers', controller.register);
router.post('/sellers', controller.login);

module.exports = router;
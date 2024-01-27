const express = require('express');
const router = express.Router();
const registerControllers = require('../controllers/controller');

router.post('/register',registerControllers.register);
router.post('/login',registerControllers.login);
router.get('/health',registerControllers.health);



module.exports = router;
const { Router } = require('express');
const userRoutes = require('./userRoutes.js');

const router = Router();

router.use('/user', userRoutes);

module.exports = router;

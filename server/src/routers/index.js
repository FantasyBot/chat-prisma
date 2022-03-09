const { Router } = require('express');
const userRoutes = require('./userRoutes.js');
const mediaRoutes = require('./mediaRoutes.js');

const router = Router();

router.use('/user', userRoutes);
router.use('/user', mediaRoutes);

module.exports = router;

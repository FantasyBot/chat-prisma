const { Router } = require('express');
const { protect } = require('../middleware/authMiddleware');
const { registerMedia } = require('../controllers/mediaController.js');
const router = Router();

router.post('/media/upload', protect, registerMedia);

module.exports = router;

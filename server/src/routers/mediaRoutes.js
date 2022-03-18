const { Router } = require('express');
const { protect } = require('../middleware/authMiddleware');
const { registerImage, saveImage} = require('../controllers/mediaController.js');
const router = Router();

// router.post('/media/upload', protect, registerMedia);
router.post('/media/upload', protect, registerImage);
router.post('/media/save', protect, saveImage);


module.exports = router;

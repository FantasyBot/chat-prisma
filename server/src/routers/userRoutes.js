const { Router } = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  userProfile,
  profileUpdate,
} = require('../controllers/userController.js');
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, userProfile);
router.put('/update', protect, profileUpdate);

module.exports = router;

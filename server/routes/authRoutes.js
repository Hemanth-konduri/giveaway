const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authControllers');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, (req, res) => {
  res.json({ message: 'Protected route works!', user: req.user });
});

module.exports = router;
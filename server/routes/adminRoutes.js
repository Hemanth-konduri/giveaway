const express = require('express')
const router = express.Router()
const { getStats, getRecentUsers, getUserGrowth, getRoleBreakdown } = require('../controllers/adminController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.get('/stats', protect, adminOnly, getStats)
router.get('/recent-users', protect, adminOnly, getRecentUsers)

router.get('/user-growth', protect, adminOnly, getUserGrowth)
router.get('/role-breakdown', protect, adminOnly, getRoleBreakdown)

module.exports = router
const express = require('express')
const router = express.Router()
const { getUserStats, getLiveCampaigns, donateToCampaign, getMyDonations, getHeroCampaigns, getUserActivities } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.get('/stats', protect, getUserStats)
router.get('/live-campaigns', protect, getLiveCampaigns)
router.post('/donate', protect, donateToCampaign)
router.get('/my-donations', protect, getMyDonations)
router.get('/hero-campaigns', protect, getHeroCampaigns)
router.get('/activities', protect, getUserActivities)

module.exports = router
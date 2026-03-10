const express = require('express')
const router = express.Router()
const {
  getAllCampaigns, getCampaign, createCampaign,
  updateCampaign, deleteCampaign, approveCampaign,
  rejectCampaign, getManagersList, getCampaignStats,
  getSingleCampaignStats
} = require('../controllers/campaignController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.get('/', protect, getAllCampaigns)
router.get('/stats', protect, adminOnly, getCampaignStats)
router.get('/managers-list', protect, adminOnly, getManagersList)
router.get('/:id/stats', protect, getSingleCampaignStats)
router.get('/:id', protect, getCampaign)
router.post('/', protect, adminOnly, createCampaign)
router.put('/:id', protect, adminOnly, updateCampaign)
router.delete('/:id', protect, adminOnly, deleteCampaign)
router.post('/:id/approve', protect, adminOnly, approveCampaign)
router.post('/:id/reject', protect, adminOnly, rejectCampaign)

module.exports = router
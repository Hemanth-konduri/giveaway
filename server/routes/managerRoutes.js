const express = require('express')
const router = express.Router()
const {
  getAllManagers, createManager, assignManagerDetails,
  updateManager, approveManager, rejectManager,
  suspendManager, deleteManager, getManagerStats
} = require('../controllers/managerController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.get('/', protect, adminOnly, getAllManagers)
router.post('/', protect, adminOnly, createManager)
router.put('/:id', protect, adminOnly, updateManager)
router.post('/:id/assign', protect, adminOnly, assignManagerDetails)
router.post('/:id/approve', protect, adminOnly, approveManager)
router.post('/:id/reject', protect, adminOnly, rejectManager)
router.post('/:id/suspend', protect, adminOnly, suspendManager)
router.delete('/:id', protect, adminOnly, deleteManager)
router.get('/:id/stats', protect, adminOnly, getManagerStats)

module.exports = router
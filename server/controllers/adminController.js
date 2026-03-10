const pool = require('../config/db')

const getStats = async (req, res) => {
  try {
    const totalUsers = await pool.query('SELECT COUNT(*) FROM users')
    
    const verifiedUsers = await pool.query('SELECT COUNT(*) FROM users WHERE is_verified = true')
    const admins = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'admin'")
    const managers = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'manager'")
    const regularUsers = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'user'")

    res.status(200).json({
      totalUsers: parseInt(totalUsers.rows[0].count),
      
      verifiedUsers: parseInt(verifiedUsers.rows[0].count),
      admins: parseInt(admins.rows[0].count),
      managers: parseInt(managers.rows[0].count),
      regularUsers: parseInt(regularUsers.rows[0].count),
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const getRecentUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, role, is_verified, created_at 
       FROM users 
       ORDER BY created_at DESC 
       LIMIT 10`
    )
    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const getUserGrowth = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(DATE_TRUNC('day', created_at), 'Mon DD') as date,
        COUNT(*) as count
      FROM users
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY DATE_TRUNC('day', created_at)
    `)
    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const getRoleBreakdown = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT role, COUNT(*) as count
      FROM users
      GROUP BY role
    `)
    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getStats, getRecentUsers, getUserGrowth, getRoleBreakdown }


const pool = require('../config/db')

// Get all campaigns (admin sees all, manager sees only assigned)
const getAllCampaigns = async (req, res) => {
  try {
    const { search = '', status = '', category = '', page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit
    const { id: userId, role } = req.user

    let conditions = []
    const params = []
    let paramCount = 1

    // Manager only sees assigned campaigns
    if (role === 'manager') {
      conditions.push(`c.assigned_manager_id = $${paramCount}`)
      params.push(userId)
      paramCount++
    }

    if (search) {
      conditions.push(`(c.title ILIKE $${paramCount} OR c.description ILIKE $${paramCount} OR c.city ILIKE $${paramCount})`)
      params.push(`%${search}%`)
      paramCount++
    }

    if (status) {
      conditions.push(`c.status = $${paramCount}`)
      params.push(status)
      paramCount++
    }

    if (category) {
      conditions.push(`c.category = $${paramCount}`)
      params.push(category)
      paramCount++
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    const query = `
      SELECT 
        c.*,
        u.full_name as created_by_name,
        u.email as created_by_email,
        m.full_name as manager_name,
        m.email as manager_email,
        COALESCE(
          (SELECT SUM(amount) FROM donations WHERE campaign_id = c.id AND payment_status = 'completed'),
          0
        ) as total_raised,
        (SELECT COUNT(*) FROM donations WHERE campaign_id = c.id) as donors_count
      FROM campaigns c
      LEFT JOIN users u ON c.created_by = u.id
      LEFT JOIN users m ON c.assigned_manager_id = m.id
      ${whereClause}
      ORDER BY c.created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `
    params.push(limit, offset)

    const result = await pool.query(query, params)

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM campaigns c ${whereClause}`,
      params.slice(0, -2)
    )

    res.status(200).json({
      data: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      totalPages: Math.ceil(countResult.rows[0].count / limit)
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get single campaign
const getCampaign = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(`
      SELECT 
        c.*,
        u.full_name as created_by_name,
        u.email as created_by_email,
        m.full_name as manager_name,
        m.email as manager_email,
        md.organization_name,
        COALESCE(
          (SELECT SUM(amount) FROM donations WHERE campaign_id = c.id AND payment_status = 'completed'),
          0
        ) as total_raised,
        (SELECT COUNT(*) FROM donations WHERE campaign_id = c.id) as donors_count
      FROM campaigns c
      LEFT JOIN users u ON c.created_by = u.id
      LEFT JOIN users m ON c.assigned_manager_id = m.id
      LEFT JOIN manager_details md ON m.id = md.user_id
      WHERE c.id = $1
    `, [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Campaign not found' })
    }

    res.status(200).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Create campaign (admin only)
const createCampaign = async (req, res) => {
  try {
    const {
      title, description, category, goal_amount,
      assigned_manager_id, location, city, state,
      image_url, is_urgent, is_featured,
      start_date, end_date
    } = req.body

    if (!title || !goal_amount) {
      return res.status(400).json({ message: 'Title and goal amount are required' })
    }

    const result = await pool.query(`
      INSERT INTO campaigns (
        title, description, category, goal_amount,
        assigned_manager_id, created_by, location, city, state,
        image_url, is_urgent, is_featured, start_date, end_date, status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,'approved')
      RETURNING *
    `, [
      title, description, category, goal_amount,
      assigned_manager_id || null, req.user.id,
      location, city, state, image_url,
      is_urgent || false, is_featured || false,
      start_date || null, end_date || null
    ])

    res.status(201).json({
      message: 'Campaign created successfully',
      campaign: result.rows[0]
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update campaign
const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params
    const {
      title, description, category, goal_amount,
      assigned_manager_id, location, city, state,
      image_url, is_urgent, is_featured,
      start_date, end_date, status
    } = req.body

    await pool.query(`
      UPDATE campaigns SET
        title=$1, description=$2, category=$3, goal_amount=$4,
        assigned_manager_id=$5, location=$6, city=$7, state=$8,
        image_url=$9, is_urgent=$10, is_featured=$11,
        start_date=$12, end_date=$13, status=$14, updated_at=NOW()
      WHERE id=$15
    `, [
      title, description, category, goal_amount,
      assigned_manager_id || null, location, city, state,
      image_url, is_urgent, is_featured,
      start_date || null, end_date || null, status, id
    ])

    res.status(200).json({ message: 'Campaign updated successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete campaign
const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM campaigns WHERE id=$1', [id])
    res.status(200).json({ message: 'Campaign deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Approve campaign
const approveCampaign = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query(
      `UPDATE campaigns SET status='approved', updated_at=NOW() WHERE id=$1`, [id]
    )
    res.status(200).json({ message: 'Campaign approved' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Reject campaign
const rejectCampaign = async (req, res) => {
  try {
    const { id } = req.params
    const { reason } = req.body
    await pool.query(
      `UPDATE campaigns SET status='rejected', rejection_reason=$1, updated_at=NOW() WHERE id=$2`,
      [reason, id]
    )
    res.status(200).json({ message: 'Campaign rejected' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get approved managers list (for dropdown)
const getManagersList = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.full_name, u.email, md.organization_name, md.city, md.state
      FROM users u
      JOIN manager_details md ON u.id = md.user_id
      WHERE u.role = 'manager' AND md.status = 'approved'
      ORDER BY u.full_name
    `)
    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get campaign stats (for admin overview)
const getCampaignStats = async (req, res) => {
  try {
    const total = await pool.query('SELECT COUNT(*) FROM campaigns')
    const approved = await pool.query(`SELECT COUNT(*) FROM campaigns WHERE status='approved'`)
    const pending = await pool.query(`SELECT COUNT(*) FROM campaigns WHERE status='pending'`)
    const completed = await pool.query(`SELECT COUNT(*) FROM campaigns WHERE status='completed'`)
    const paused = await pool.query(`SELECT COUNT(*) FROM campaigns WHERE status='paused'`)
    const rejected = await pool.query(`SELECT COUNT(*) FROM campaigns WHERE status='rejected'`)
    const totalRaised = await pool.query(`SELECT COALESCE(SUM(amount),0) as total FROM donations WHERE payment_status='completed'`)
    const totalDonors = await pool.query(`SELECT COUNT(DISTINCT user_id) as total FROM donations`)
    const urgentCampaigns = await pool.query(`SELECT COUNT(*) FROM campaigns WHERE is_urgent=true AND status='approved'`)
    const featuredCampaigns = await pool.query(`SELECT COUNT(*) FROM campaigns WHERE is_featured=true`)

    res.status(200).json({
      total: parseInt(total.rows[0].count),
      approved: parseInt(approved.rows[0].count),
      pending: parseInt(pending.rows[0].count),
      completed: parseInt(completed.rows[0].count),
      paused: parseInt(paused.rows[0].count),
      rejected: parseInt(rejected.rows[0].count),
      totalRaised: parseFloat(totalRaised.rows[0].total),
      totalDonors: parseInt(totalDonors.rows[0].total),
      urgentCampaigns: parseInt(urgentCampaigns.rows[0].count),
      featuredCampaigns: parseInt(featuredCampaigns.rows[0].count)
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get individual campaign stats
const getSingleCampaignStats = async (req, res) => {
  try {
    const { id } = req.params

    const campaign = await pool.query(`
      SELECT 
        c.*,
        m.full_name as manager_name,
        md.organization_name,
        COALESCE(SUM(d.amount) FILTER (WHERE d.payment_status='completed'), 0) as total_raised,
        COUNT(DISTINCT d.id) as total_donations,
        COUNT(DISTINCT d.user_id) as unique_donors,
        MAX(d.created_at) as last_donation_at,
        ROUND(
          CASE WHEN c.goal_amount > 0 
          THEN (COALESCE(SUM(d.amount) FILTER (WHERE d.payment_status='completed'), 0) / c.goal_amount * 100)
          ELSE 0 END, 2
        ) as progress_percent
      FROM campaigns c
      LEFT JOIN users m ON c.assigned_manager_id = m.id
      LEFT JOIN manager_details md ON m.id = md.user_id
      LEFT JOIN donations d ON c.id = d.campaign_id
      WHERE c.id = $1
      GROUP BY c.id, m.full_name, md.organization_name
    `, [id])

    if (campaign.rows.length === 0) {
      return res.status(404).json({ message: 'Campaign not found' })
    }

    const donationGrowth = await pool.query(`
      SELECT 
        TO_CHAR(DATE_TRUNC('day', created_at), 'Mon DD') as date,
        COUNT(*) as donations,
        COALESCE(SUM(amount), 0) as amount
      FROM donations
      WHERE campaign_id = $1
        AND created_at >= NOW() - INTERVAL '30 days'
        AND payment_status = 'completed'
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY DATE_TRUNC('day', created_at)
    `, [id])

    const topDonors = await pool.query(`
      SELECT 
        CASE WHEN d.is_anonymous THEN 'Anonymous' ELSE u.full_name END as donor_name,
        SUM(d.amount) as total_donated,
        COUNT(*) as donation_count,
        MAX(d.created_at) as last_donated_at
      FROM donations d
      LEFT JOIN users u ON d.user_id = u.id
      WHERE d.campaign_id = $1 AND d.payment_status = 'completed'
      GROUP BY 
        CASE WHEN d.is_anonymous THEN 'Anonymous' ELSE u.full_name END
      ORDER BY total_donated DESC
      LIMIT 5
    `, [id])

    const recentDonations = await pool.query(`
      SELECT 
        CASE WHEN d.is_anonymous THEN 'Anonymous' ELSE u.full_name END as donor_name,
        d.amount, d.message, d.created_at, d.is_anonymous
      FROM donations d
      LEFT JOIN users u ON d.user_id = u.id
      WHERE d.campaign_id = $1 AND d.payment_status = 'completed'
      ORDER BY d.created_at DESC
      LIMIT 10
    `, [id])

    res.status(200).json({
      campaign: campaign.rows[0],
      donationGrowth: donationGrowth.rows,
      topDonors: topDonors.rows,
      recentDonations: recentDonations.rows
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getAllCampaigns, getCampaign, createCampaign,
  updateCampaign, deleteCampaign, approveCampaign,
  rejectCampaign, getManagersList, getCampaignStats,
  getSingleCampaignStats
}
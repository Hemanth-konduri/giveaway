const pool = require('../config/db')

// User dashboard overview stats
const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id

    const totalDonated = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE user_id = $1 AND payment_status = 'completed'`,
      [userId]
    )

    const donationsCount = await pool.query(
      `SELECT COUNT(*) FROM donations WHERE user_id = $1`,
      [userId]
    )

    const campaignsSupported = await pool.query(
      `SELECT COUNT(DISTINCT campaign_id) FROM donations WHERE user_id = $1`,
      [userId]
    )

    const myCampaigns = await pool.query(
      `SELECT COUNT(*) FROM campaigns WHERE created_by = $1`,
      [userId]
    )

    const recentDonations = await pool.query(
      `SELECT d.*, c.title as campaign_title, c.image_url, c.category
       FROM donations d
       JOIN campaigns c ON d.campaign_id = c.id
       WHERE d.user_id = $1
       ORDER BY d.created_at DESC LIMIT 5`,
      [userId]
    )

    res.status(200).json({
      totalDonated: parseFloat(totalDonated.rows[0].total),
      donationsCount: parseInt(donationsCount.rows[0].count),
      campaignsSupported: parseInt(campaignsSupported.rows[0].count),
      myCampaigns: parseInt(myCampaigns.rows[0].count),
      recentDonations: recentDonations.rows
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get live campaigns for user to browse
const getLiveCampaigns = async (req, res) => {
  try {
    const { search = '', category = '', page = 1, limit = 9 } = req.query
    const offset = (page - 1) * limit

    let conditions = [`c.status = 'approved'`]
    const params = []
    let paramCount = 1

    if (search) {
      conditions.push(`(c.title ILIKE $${paramCount} OR c.description ILIKE $${paramCount} OR c.city ILIKE $${paramCount})`)
      params.push(`%${search}%`)
      paramCount++
    }

    if (category) {
      conditions.push(`c.category = $${paramCount}`)
      params.push(category)
      paramCount++
    }

    const whereClause = `WHERE ${conditions.join(' AND ')}`

    const result = await pool.query(`
      SELECT
        c.*,
        m.full_name as manager_name,
        md.organization_name,
        COALESCE(
          (SELECT SUM(amount) FROM donations WHERE campaign_id = c.id AND payment_status = 'completed'), 0
        ) as total_raised,
        (SELECT COUNT(*) FROM donations WHERE campaign_id = c.id) as donors_count
      FROM campaigns c
      LEFT JOIN users m ON c.assigned_manager_id = m.id
      LEFT JOIN manager_details md ON m.id = md.user_id
      ${whereClause}
      ORDER BY c.is_urgent DESC, c.is_featured DESC, c.created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, [...params, limit, offset])

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM campaigns c ${whereClause}`,
      params
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

// Donate to a campaign
const donateToCampaign = async (req, res) => {
  try {
    const { campaign_id, amount, message, is_anonymous } = req.body
    const userId = req.user.id

    if (!campaign_id || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Campaign and valid amount are required' })
    }

    // Check campaign exists and is approved
    const campaign = await pool.query(
      `SELECT * FROM campaigns WHERE id = $1 AND status = 'approved'`, [campaign_id]
    )
    if (campaign.rows.length === 0) {
      return res.status(404).json({ message: 'Campaign not found or not active' })
    }

    // Insert donation
    const donation = await pool.query(
      `INSERT INTO donations (campaign_id, user_id, amount, message, is_anonymous, payment_status)
       VALUES ($1, $2, $3, $4, $5, 'completed') RETURNING *`,
      [campaign_id, userId, amount, message || null, is_anonymous || false]
    )

    // Update raised amount
    await pool.query(
      `UPDATE campaigns SET raised_amount = raised_amount + $1, updated_at = NOW() WHERE id = $2`,
      [amount, campaign_id]
    )

    res.status(201).json({
      message: 'Donation successful!',
      donation: donation.rows[0]
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get user's donation history
const getMyDonations = async (req, res) => {
  try {
    const userId = req.user.id

    const result = await pool.query(`
      SELECT d.*, c.title as campaign_title, c.image_url, c.category, c.status as campaign_status
      FROM donations d
      JOIN campaigns c ON d.campaign_id = c.id
      WHERE d.user_id = $1
      ORDER BY d.created_at DESC
    `, [userId])

    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get hero slider campaigns (urgent + featured)
const getHeroCampaigns = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id, c.title, c.description, c.image_url,
             c.goal_amount, c.is_urgent, c.is_featured, c.category,
             c.city, c.state,
             COALESCE(
               (SELECT SUM(amount) FROM donations WHERE campaign_id = c.id AND payment_status = 'completed'), 0
             ) as total_raised,
             (SELECT COUNT(*) FROM donations WHERE campaign_id = c.id) as donors_count
      FROM campaigns c
      WHERE c.status = 'approved' AND (c.is_urgent = true OR c.is_featured = true)
      ORDER BY c.is_urgent DESC, c.created_at DESC
      LIMIT 5
    `)

    if (result.rows.length === 0) {
      const fallback = await pool.query(`
        SELECT c.id, c.title, c.description, c.image_url,
               c.goal_amount, c.is_urgent, c.is_featured, c.category,
               c.city, c.state,
               COALESCE(
                 (SELECT SUM(amount) FROM donations WHERE campaign_id = c.id AND payment_status = 'completed'), 0
               ) as total_raised,
               (SELECT COUNT(*) FROM donations WHERE campaign_id = c.id) as donors_count
        FROM campaigns c
        WHERE c.status = 'approved'
        ORDER BY c.created_at DESC
        LIMIT 5
      `)
      return res.status(200).json(fallback.rows)
    }

    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get user recent activities
const getUserActivities = async (req, res) => {
  try {
    const userId = req.user.id

    const donations = await pool.query(`
      SELECT 
        'donation' as type,
        d.id,
        d.amount,
        d.created_at,
        d.is_anonymous,
        c.title as campaign_title,
        c.category,
        c.image_url,
        c.id as campaign_id
      FROM donations d
      JOIN campaigns c ON d.campaign_id = c.id
      WHERE d.user_id = $1
      ORDER BY d.created_at DESC
      LIMIT 5
    `, [userId])

    const volunteers = await pool.query(`
      SELECT
        'volunteer' as type,
        va.id,
        va.status,
        va.created_at,
        c.title as campaign_title,
        c.category,
        c.image_url,
        c.id as campaign_id
      FROM volunteer_applications va
      JOIN campaigns c ON va.campaign_id = c.id
      WHERE va.user_id = $1
      ORDER BY va.created_at DESC
      LIMIT 5
    `, [userId]).catch(() => ({ rows: [] }))

    const all = [
      ...donations.rows,
      ...volunteers.rows
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10)

    res.status(200).json(all)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getUserStats, getLiveCampaigns, donateToCampaign, getMyDonations, getHeroCampaigns, getUserActivities }
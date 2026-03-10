const pool = require('../config/db')
const bcrypt = require('bcryptjs')

// Get all managers with their details
const getAllManagers = async (req, res) => {
  try {
    const { search = '', status = '', page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit

    let conditions = [`u.role = 'manager'`]
    const params = []
    let paramCount = 1

    if (search) {
      conditions.push(`(u.full_name ILIKE $${paramCount} OR u.email ILIKE $${paramCount} OR md.organization_name ILIKE $${paramCount})`)
      params.push(`%${search}%`)
      paramCount++
    }

    if (status) {
      conditions.push(`md.status = $${paramCount}`)
      params.push(status)
      paramCount++
    }

    const whereClause = conditions.join(' AND ')

    const query = `
      SELECT 
        u.id, u.full_name, u.email, u.phone, u.location,
        u.is_verified, u.created_at, u.profile_picture,
        md.id as detail_id, md.organization_name, md.organization_type,
        md.city, md.state, md.country, md.status as manager_status,
        md.document_verified, md.office_phone, md.office_email,
        md.website, md.address_line_1, md.postal_code,
        md.registration_number, md.tax_id, md.document_type,
        md.document_number, md.rejection_reason,
        0 as campaigns_count
      FROM users u
      LEFT JOIN manager_details md ON u.id = md.user_id
      WHERE ${whereClause}
      ORDER BY u.created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `
    params.push(limit, offset)

    const result = await pool.query(query, params)

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM users u
       LEFT JOIN manager_details md ON u.id = md.user_id
       WHERE ${whereClause}`,
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

// Create manager (basic details)
const createManager = async (req, res) => {
  try {
    const { full_name, email, password, phone, location } = req.body

    if (!full_name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }

    // Check if email exists
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password, phone, location, role, is_verified)
       VALUES ($1, $2, $3, $4, $5, 'manager', true)
       RETURNING id, full_name, email, phone, location, role, created_at`,
      [full_name, email, hashedPassword, phone || null, location || null]
    )

    res.status(201).json({
      message: 'Manager created successfully',
      manager: result.rows[0]
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Assign manager details (org info, documents)
const assignManagerDetails = async (req, res) => {
  try {
    const { id } = req.params
    const {
      organization_name, organization_type, registration_number, tax_id,
      city, state, country, postal_code, address_line_1, address_line_2,
      office_phone, office_email, website,
      document_type, document_number
    } = req.body

    // Check if manager_details exists
    const existing = await pool.query('SELECT id FROM manager_details WHERE user_id = $1', [id])

    if (existing.rows.length > 0) {
      // Update
      await pool.query(
        `UPDATE manager_details SET
          organization_name = $1, organization_type = $2, registration_number = $3,
          tax_id = $4, city = $5, state = $6, country = $7, postal_code = $8,
          address_line_1 = $9, address_line_2 = $10, office_phone = $11,
          office_email = $12, website = $13, document_type = $14,
          document_number = $15, updated_at = NOW()
        WHERE user_id = $16`,
        [
          organization_name, organization_type, registration_number, tax_id,
          city, state, country, postal_code, address_line_1, address_line_2,
          office_phone, office_email, website, document_type, document_number, id
        ]
      )
    } else {
      // Insert
      await pool.query(
        `INSERT INTO manager_details (
          user_id, organization_name, organization_type, registration_number,
          tax_id, city, state, country, postal_code, address_line_1, address_line_2,
          office_phone, office_email, website, document_type, document_number, status
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,'pending')`,
        [
          id, organization_name, organization_type, registration_number,
          tax_id, city, state, country, postal_code, address_line_1, address_line_2,
          office_phone, office_email, website, document_type, document_number
        ]
      )
    }

    res.status(200).json({ message: 'Manager details assigned successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update manager basic details
const updateManager = async (req, res) => {
  try {
    const { id } = req.params
    const { full_name, email, phone, location } = req.body

    await pool.query(
      `UPDATE users SET full_name=$1, email=$2, phone=$3, location=$4, updated_at=NOW()
       WHERE id=$5 AND role='manager'`,
      [full_name, email, phone, location, id]
    )

    res.status(200).json({ message: 'Manager updated successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Approve manager
const approveManager = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query(
      `UPDATE manager_details SET status='approved', updated_at=NOW() WHERE user_id=$1`, [id]
    )
    res.status(200).json({ message: 'Manager approved' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Reject manager
const rejectManager = async (req, res) => {
  try {
    const { id } = req.params
    const { reason } = req.body
    await pool.query(
      `UPDATE manager_details SET status='rejected', rejection_reason=$1, updated_at=NOW() WHERE user_id=$2`,
      [reason, id]
    )
    res.status(200).json({ message: 'Manager rejected' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Suspend manager
const suspendManager = async (req, res) => {
  try {
    const { id } = req.params
    const { reason } = req.body
    await pool.query(
      `UPDATE manager_details SET status='suspended', rejection_reason=$1, updated_at=NOW() WHERE user_id=$2`,
      [reason, id]
    )
    res.status(200).json({ message: 'Manager suspended' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete manager
const deleteManager = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query(`DELETE FROM users WHERE id=$1 AND role='manager'`, [id])
    res.status(200).json({ message: 'Manager deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get single manager stats (for dashboard)
const getManagerStats = async (req, res) => {
  try {
    const { id } = req.params

    const manager = await pool.query(
      `SELECT u.*, md.* FROM users u
       LEFT JOIN manager_details md ON u.id = md.user_id
       WHERE u.id = $1 AND u.role = 'manager'`, [id]
    )

    if (manager.rows.length === 0) {
      return res.status(404).json({ message: 'Manager not found' })
    }

    res.status(200).json(manager.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getAllManagers, createManager, assignManagerDetails,
  updateManager, approveManager, rejectManager,
  suspendManager, deleteManager, getManagerStats
}
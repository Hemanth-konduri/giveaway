const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../config/emailService');

const register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    // Check if user already exists
    const existing = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Insert new user
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password, otp, otp_expires_at)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, role`,
      [full_name, email, hashedPassword, otp, otpExpiresAt]
    );

    const user = result.rows[0];

    // Send OTP email
    await sendOTPEmail(email, full_name, otp);

    res.status(201).json({
      message: 'Registration successful! Please check your email for OTP.',
      userId: user.id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1', [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Check if already verified
    if (user.is_verified) {
      return res.status(400).json({ message: 'Account already verified' });
    }

    // Check OTP match
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check OTP expiry
    if (new Date() > new Date(user.otp_expires_at)) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Mark user as verified
    await pool.query(
      `UPDATE users 
       SET is_verified = true, otp = null, otp_expires_at = null 
       WHERE id = $1`,
      [userId]
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Email verified successfully!',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, verifyOTP };
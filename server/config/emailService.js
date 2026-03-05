const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

const sendOTPEmail = async (email, full_name, otp) => {
  try {
    await transporter.sendMail({
      from: `"GiveWave" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Verify your GiveWave account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #00e5a0;">Welcome to GiveWave! 👋</h2>
          <p>Hi ${full_name},</p>
          <p>Your OTP verification code is:</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #333; letter-spacing: 8px;">${otp}</h1>
          </div>
          <p>This code expires in <strong>10 minutes</strong>.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <br/>
          <p>Team GiveWave 💚</p>
        </div>
      `
    })
    return true
  } catch (err) {
    console.error('Email error:', err)
    return false
  }
}

module.exports = { sendOTPEmail }
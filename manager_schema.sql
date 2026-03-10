-- Enhanced Users Table with Manager Details
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
  is_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMP,
  profile_picture VARCHAR(255),
  phone VARCHAR(20),
  location VARCHAR(150),
  otp VARCHAR(6),
  otp_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Manager Details Table (Extended Information)
CREATE TABLE manager_details (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  organization_name VARCHAR(200) NOT NULL,
  organization_type VARCHAR(50) CHECK (organization_type IN ('NGO', 'Government', 'Corporate', 'Individual', 'Other')),
  registration_number VARCHAR(100),
  tax_id VARCHAR(100),
  
  -- Location Details
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  country VARCHAR(100) DEFAULT 'India',
  postal_code VARCHAR(20),
  address_line_1 VARCHAR(255) NOT NULL,
  address_line_2 VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Contact Details
  office_phone VARCHAR(20),
  office_email VARCHAR(150),
  website VARCHAR(255),
  
  -- Verification Details
  document_type VARCHAR(50) CHECK (document_type IN ('Aadhar', 'PAN', 'Passport', 'Driving License', 'Other')),
  document_number VARCHAR(100),
  document_url VARCHAR(255),
  document_verified BOOLEAN DEFAULT false,
  document_verified_at TIMESTAMP,
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  rejection_reason TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Email Verification Tokens Table
CREATE TABLE email_verification_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(150) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Manager Activity Log
CREATE TABLE manager_activity_log (
  id SERIAL PRIMARY KEY,
  manager_id INTEGER NOT NULL,
  action VARCHAR(100) NOT NULL,
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Manager Permissions Table
CREATE TABLE manager_permissions (
  id SERIAL PRIMARY KEY,
  manager_id INTEGER NOT NULL,
  permission VARCHAR(100) NOT NULL,
  granted_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(manager_id, permission)
);

-- Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_verified ON users(is_verified);
CREATE INDEX idx_manager_details_user_id ON manager_details(user_id);
CREATE INDEX idx_manager_details_status ON manager_details(status);
CREATE INDEX idx_manager_details_city ON manager_details(city);
CREATE INDEX idx_manager_details_state ON manager_details(state);
CREATE INDEX idx_email_verification_tokens_user_id ON email_verification_tokens(user_id);
CREATE INDEX idx_email_verification_tokens_token ON email_verification_tokens(token);
CREATE INDEX idx_manager_activity_log_manager_id ON manager_activity_log(manager_id);
CREATE INDEX idx_manager_permissions_manager_id ON manager_permissions(manager_id);

-- Sample Manager Registration (Before Email Verification)
-- INSERT INTO users (full_name, email, password, role, is_verified)
-- VALUES (
--   'Manager Name',
--   'manager@example.com',
--   '$2b$10$hashedpassword',
--   'manager',
--   false
-- );

-- INSERT INTO manager_details (
--   user_id,
--   organization_name,
--   organization_type,
--   registration_number,
--   tax_id,
--   city,
--   state,
--   country,
--   postal_code,
--   address_line_1,
--   address_line_2,
--   office_phone,
--   office_email,
--   website,
--   document_type,
--   document_number,
--   document_url,
--   status
-- ) VALUES (
--   1,
--   'Organization Name',
--   'NGO',
--   'REG123456',
--   'TAX123456',
--   'Vijayawada',
--   'Andhra Pradesh',
--   'India',
--   '520001',
--   '123 Main Street',
--   'Suite 100',
--   '+91 9876543210',
--   'office@organization.com',
--   'https://organization.com',
--   'Aadhar',
--   '123456789012',
--   'https://storage.example.com/doc.pdf',
--   'pending'
-- );

-- INSERT INTO email_verification_tokens (user_id, token, email, expires_at)
-- VALUES (
--   1,
--   'unique_token_here',
--   'manager@example.com',
--   NOW() + INTERVAL '24 hours'
-- );

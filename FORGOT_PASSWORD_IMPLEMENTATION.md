# Forgot Password Flow - Complete Implementation Guide

## Overview
This document explains the complete OTP-based forgot password flow for the MERN application. The flow involves:
1. User requests password reset (sends email)
2. OTP is generated and sent to email via Brevo
3. User verifies OTP
4. User sets new password

---

## Backend APIs

### 1. **Send OTP - Forgot Password**

**Endpoint:** `POST /admin/forgot-password` or `POST /customer/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": null,
  "message": "OTP sent to your registered email"
}
```

**Error Response (404):**
```json
{
  "statusCode": 404,
  "message": "No account found with this email"
}
```

**Error Response (500):**
```json
{
  "statusCode": 500,
  "message": "Failed to send OTP email. Please try again later."
}
```

**Backend Logic:**
- Validates email is provided
- Checks if user exists in database
- Generates 6-digit random OTP
- Sets OTP expiry to 10 minutes from now
- Sends OTP email via Brevo
- Stores OTP in database (encrypted recommended for production)
- Returns success message

**Status Codes:**
- 200: OTP sent successfully
- 400: Missing email or invalid input
- 404: User not found
- 500: Email service failed

---

### 2. **Verify OTP**

**Endpoint:** `POST /admin/verify-otp` or `POST /customer/verify-otp`

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "email": "user@example.com"
  },
  "message": "OTP verified successfully"
}
```

**Error Response (400) - OTP Mismatch:**
```json
{
  "statusCode": 400,
  "message": "Invalid OTP"
}
```

**Error Response (400) - OTP Expired:**
```json
{
  "statusCode": 400,
  "message": "OTP has expired. Please request a new one."
}
```

**Backend Logic:**
- Validates email and OTP are provided
- Checks if user exists
- Retrieves stored OTP and expiry
- Compares provided OTP with stored OTP
- Checks if OTP has expired
- Marks OTP as verified in database
- Returns success

**Status Codes:**
- 200: OTP verified
- 400: Invalid OTP, expired OTP, or missing fields
- 404: User not found
- 500: Server error

---

### 3. **Reset Password**

**Endpoint:** `POST /admin/reset-password-otp` or `POST /customer/reset-password-otp`

**Request Body:**
```json
{
  "email": "user@example.com",
  "newPassword": "newPassword123!",
  "confirmPassword": "newPassword123!"
}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": null,
  "message": "Password reset successfully"
}
```

**Error Response (400) - Passwords Don't Match:**
```json
{
  "statusCode": 400,
  "message": "Passwords do not match"
}
```

**Error Response (400) - Password Too Short:**
```json
{
  "statusCode": 400,
  "message": "Password must be at least 6 characters long"
}
```

**Error Response (400) - OTP Not Verified:**
```json
{
  "statusCode": 400,
  "message": "OTP verification required before resetting password"
}
```

**Backend Logic:**
- Validates all fields are provided
- Checks passwords match
- Validates password length >= 6
- Finds user by email
- Checks OTP is verified
- Encrypts new password using bcrypt
- Updates user password
- Clears OTP and isOtpVerified flag
- Returns success

**Status Codes:**
- 200: Password reset successfully
- 400: Validation error or OTP not verified
- 404: User not found
- 500: Server error

---

## Database Schema Updates

### Admin Schema
```javascript
{
  // ... existing fields
  otp: {
    type: String,
    default: null
  },
  otpExpiry: {
    type: Date,
    default: null
  },
  isOtpVerified: {
    type: Boolean,
    default: false
  }
}
```

### Customer Schema
```javascript
{
  // ... existing fields
  otp: {
    type: String,
    default: null
  },
  otpExpiry: {
    type: Date,
    default: null
  },
  isOtpVerified: {
    type: Boolean,
    default: false
  }
}
```

---

## Frontend Components

### 1. **ForgotPasswordOTP Component** (`/admin/forgot-password`)

**Path:** `frontend/src/pages/admin/ForgotPasswordOTP.jsx`

**Features:**
- Email input field with validation
- Sends OTP request to backend
- Shows loading state
- Displays error messages
- Navigates to verify OTP page with email in state

**Key Functions:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await postService(
    "/admin/forgot-password",
    { email: email.trim() },
    "Sending OTP to your email..."
  );
  
  if (response.ok) {
    navigate("/admin/verify-otp", { state: { email } });
  }
}
```

---

### 2. **VerifyOTP Component** (`/admin/verify-otp`)

**Path:** `frontend/src/pages/admin/VerifyOTP.jsx`

**Features:**
- 6-digit OTP input field
- 10-minute countdown timer
- Resend OTP functionality
- OTP verification request
- Navigates to reset password on success

**Key Functions:**
```javascript
const handleVerifyOTP = async (e) => {
  e.preventDefault();
  const response = await postService(
    "/admin/verify-otp",
    { email: email.trim(), otp },
    "Verifying OTP..."
  );
  
  if (response.ok) {
    navigate("/admin/reset-password-otp", { state: { email } });
  }
}
```

---

### 3. **ResetPasswordOTP Component** (`/admin/reset-password-otp`)

**Path:** `frontend/src/pages/admin/ResetPasswordOTP.jsx`

**Features:**
- New password and confirm password inputs
- Password strength indicator
- Show/hide password toggles
- Password validation
- Success confirmation message
- Redirects to login after reset

**Key Functions:**
```javascript
const handleResetPassword = async (e) => {
  e.preventDefault();
  const response = await postService(
    "/admin/reset-password-otp",
    {
      email: email.trim(),
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    },
    "Resetting password..."
  );
  
  if (response.ok) {
    navigate("/admin/login");
  }
}
```

---

## Routes

### Admin Routes
```javascript
router.post("/forgot-password", adminForgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password-otp", resetPassword);
```

### Customer Routes
```javascript
router.post('/forgot-password', customerForgotPassword);
router.post('/verify-otp', customerVerifyOTP);
router.post('/reset-password-otp', customerResetPassword);
```

---

## Email Configuration (Brevo)

### Required Environment Variables
```
BREVO_API_KEY=xxx
BREVO_SENDER_EMAIL=noreply@importexport.com
BREVO_REPLY_EMAIL=support@importexport.com
```

### Email Template
The OTP email includes:
- OTP code in large, easy-to-read format
- Expiry time (10 minutes)
- Security notice
- Branding and footer

---

## Security Considerations

1. **OTP Generation**: 6-digit random number
2. **OTP Expiry**: 10 minutes
3. **Password Encryption**: bcrypt with salt rounds
4. **Email Validation**: Basic regex pattern validation
5. **Rate Limiting**: (Recommended) Limit OTP requests per email
6. **HTTPS**: Always use HTTPS in production
7. **Database**: Store OTP as plain text (can encrypt on production)

---

## Testing the Flow

### Step 1: Request OTP
```bash
curl -X POST http://localhost:8000/admin/forget-password \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com"}'
```

### Step 2: Verify OTP
```bash
curl -X POST http://localhost:8000/admin/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "otp": "123456"}'
```

### Step 3: Reset Password
```bash
curl -X POST http://localhost:8000/admin/reset-password-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "newPassword": "newpass123",
    "confirmPassword": "newpass123"
  }'
```

---

## Troubleshooting

### Issue: OTP email not sending
**Solution:**
1. Check BREVO_API_KEY is set in .env
2. Verify BREVO_SENDER_EMAIL is configured
3. Check Brevo account has sufficient credits
4. Review backend logs for email service errors

### Issue: OTP verification failing
**Solution:**
1. Check if OTP hasn't expired (valid for 10 minutes)
2. Verify OTP is exactly 6 digits
3. Ensure email matches the one that requested OTP
4. Check database stores OTP correctly

### Issue: Password reset not working
**Solution:**
1. Verify OTP was verified first (check isOtpVerified flag)
2. Check password meets minimum length (6 characters)
3. Ensure passwords match exactly
4. Verify email exists in database

### Issue: Frontend routes not found
**Solution:**
1. Check routes are defined in AppRoutes.jsx
2. Verify paths are relative (not absolute)
3. Ensure components are imported correctly
4. Check browser console for import errors

---

## Frontend API Calls (Using axios service)

### postService Function
```javascript
const response = await postService(
  "/endpoint",
  { data },
  "Loading message"
);

// Response object structure
if (response.ok) {
  // Success: response.data contains response data
} else {
  // Error: response.fetchMessage contains error message
}
```

---

## Files Modified

Backend:
- `models/admin/auth.model.js` - Added OTP fields
- `models/customer/auth.model.js` - Added OTP fields
- `controllers/admin/auth.controllers.js` - Added forgot password, verify OTP, reset password
- `controllers/customer/auth.controllers.js` - Added customer OTP functions
- `routers/admin/auth.route.js` - Added OTP routes
- `routers/customer/auth.route.js` - Added OTP routes
- `utils/otp.js` - New file with OTP utility functions
- `config/brevo.config.js` - Enhanced email sending

Frontend:
- `pages/admin/ForgotPasswordOTP.jsx` - New component
- `pages/admin/VerifyOTP.jsx` - Updated with correct endpoint
- `pages/admin/ResetPasswordOTP.jsx` - Updated with correct endpoint
- `routes/AppRoutes.jsx` - Updated routes

---

## Next Steps

1. Test the complete flow end-to-end
2. Implement rate limiting on OTP requests
3. Add email verification on signup
4. Implement refresh token rotation
5. Add password strength requirements UI
6. Implement account lockout after failed attempts
7. Add audit logging for security events

---

## Support

For issues or questions, check:
1. Backend console logs for detailed errors
2. Browser console for frontend errors
3. Brevo dashboard for email delivery status
4. MongoDB compass for database state

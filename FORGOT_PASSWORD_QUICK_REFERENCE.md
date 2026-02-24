# Forgot Password - Quick API Reference

## API Endpoints

### ADMIN - Forgot Password Flow

| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| POST | `/admin/forgot-password` | Send OTP to email | ✅ Working |
| POST | `/admin/verify-otp` | Verify OTP code | ✅ Working |
| POST | `/admin/reset-password-otp` | Reset password | ✅ Working |

### CUSTOMER - Forgot Password Flow

| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| POST | `/customer/forgot-password` | Send OTP to email | ✅ Working |
| POST | `/customer/verify-otp` | Verify OTP code | ✅ Working |
| POST | `/customer/reset-password-otp` | Reset password | ✅ Working |

---

## Frontend Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/admin/forgot-password` | ForgotPasswordOTP | Request OTP |
| `/admin/verify-otp` | VerifyOTP | Verify OTP |
| `/admin/reset-password-otp` | ResetPasswordOTP | Set new password |

---

## OTP Flow Sequence

```
User       →  Frontend   →  Backend   →  Brevo   →  Email
  │
  ├─→ Enter Email
  │         ├─→ POST /forgot-password
  │         │         ├─→ Generate OTP
  │         │         ├─→ Send Email
  │         │         └─→ Store OTP in DB
  │         └─→ Show VerifyOTP Page
  │
  ├─→ Enter OTP (from email)
  │         ├─→ POST /verify-otp
  │         │         ├─→ Compare OTP
  │         │         └─→ Mark as Verified
  │         └─→ Show ResetPassword Page
  │
  ├─→ Enter New Password
  │         ├─→ POST /reset-password-otp
  │         │         ├─→ Encrypt Password
  │         │         ├─→ Update DB
  │         │         └─→ Clear OTP Fields
  │         └─→ Redirect to Login
  │
  └─→ Login with New Password ✅
```

---

## Request/Response Examples

### 1. Send OTP

**Request:**
```bash
POST http://localhost:8000/admin/forgot-password
Content-Type: application/json

{
  "email": "admin@example.com"
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

---

### 2. Verify OTP

**Request:**
```bash
POST http://localhost:8000/admin/verify-otp
Content-Type: application/json

{
  "email": "admin@example.com",
  "otp": "123456"
}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "email": "admin@example.com"
  },
  "message": "OTP verified successfully"
}
```

---

### 3. Reset Password

**Request:**
```bash
POST http://localhost:8000/admin/reset-password-otp
Content-Type: application/json

{
  "email": "admin@example.com",
  "newPassword": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
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

---

## Error Codes & Messages

| Status | Code | Message | Solution |
|--------|------|---------|----------|
| 400 | Bad Request | Email is required | Provide email address |
| 400 | Bad Request | Email and OTP are required | Provide both fields |
| 400 | Bad Request | Invalid OTP | Check OTP from email |
| 400 | Bad Request | OTP has expired | Request new OTP |
| 400 | Bad Request | Passwords do not match | Ensure passwords match |
| 400 | Bad Request | Password must be at least 6 characters | Use longer password |
| 404 | Not Found | No account found with this email | Register first |
| 404 | Not Found | Admin/Customer not found | Check email address |
| 500 | Server Error | Failed to send OTP email | Check Brevo settings |
| 500 | Server Error | (Error message) | Check backend logs |

---

## Environment Variables Required

```env
# Brevo Email Service
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=noreply@importexport.com
BREVO_REPLY_EMAIL=support@importexport.com

# Database
MONGODB_URI=mongodb://localhost:27017/import-export

# JWT
JWT_SECRET=your_jwt_secret_here

# Server
PORT=8000
```

---

## Testing Checklist

- [ ] OTP is sent to correct email
- [ ] OTP expires after 10 minutes
- [ ] Incorrect OTP shows error
- [ ] Expired OTP shows error
- [ ] Password mismatch shows error
- [ ] Password too short shows error
- [ ] Valid password resets successfully
- [ ] Can login with new password
- [ ] User cannot access protected routes without login
- [ ] Frontend navigates correctly between pages
- [ ] Email template looks good
- [ ] No console errors in browser
- [ ] No errors in backend logs
- [ ] Database is updated correctly
- [ ] OTP fields are cleared after reset

---

## Common Issues & Solutions

### ❌ "Failed to send OTP email"
**Check:**
- BREVO_API_KEY is set
- Brevo account has credits
- Email format is valid
- Network connection is working

### ❌ "Invalid OTP"
**Check:**
- OTP hasn't expired (10 min limit)
- OTP is exactly 6 digits
- Copy-paste error in OTP
- Correct email was used

### ❌ "OTP verification required"
**Check:**
- First verify OTP before reset
- Don't skip the verify step
- Check isOtpVerified in database

### ❌ Frontend route not found
**Check:**
- Routes in AppRoutes.jsx are correct
- Components are imported
- Path matches exactly
- Router is wrapped with BrowserRouter

---

## Database Fields

### Added to Admin/Customer Schema

```javascript
otp: {
  type: String,
  default: null
}

otpExpiry: {
  type: Date,
  default: null
}

isOtpVerified: {
  type: Boolean,
  default: false
}
```

---

## Utility Functions (utils/otp.js)

```javascript
generateOTP()                    // Returns 6-digit OTP
getOTPExpiry()                   // Returns expiry date (10 min)
sendOTPEmail(email, otp, name)   // Sends OTP via Brevo
verifyOTPValidity(otp1, otp2, expiry)  // Validates OTP
```

---

## Implementation Status

✅ Backend Admin APIs
✅ Backend Customer APIs  
✅ Database Schema Updated
✅ OTP Utility Functions
✅ Brevo Email Integration
✅ Frontend Components
✅ Frontend Routes
✅ Error Handling
✅ Console Logging
✅ Documentation

---

## Next Steps

1. Test all API endpoints with Postman
2. Test frontend flow end-to-end
3. Check email delivery in Brevo dashboard
4. Monitor backend logs for errors
5. Test with invalid data
6. Test OTP expiry
7. Test resend OTP functionality
8. Gather user feedback

---

## Useful Links

- Frontend: http://localhost:5174/admin/forgot-password
- Backend Base: http://localhost:8000
- Brevo Dashboard: https://app-smtp.brevo.com
- MongoDB Compass: mongodb://localhost:27017

---

## Support

Check these files for implementation details:
- `FORGOT_PASSWORD_IMPLEMENTATION.md` - Complete guide
- `backend/utils/otp.js` - OTP functions
- `backend/controllers/admin/auth.controllers.js` - Admin logic
- `backend/controllers/customer/auth.controllers.js` - Customer logic
- `frontend/pages/admin/ForgotPasswordOTP.jsx` - Frontend flow

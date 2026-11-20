# Hari Arts and Science College — Backend API

Node.js + Express + MongoDB backend starter for the 12-page React college website.

## Requirements
- Node.js 18+
- MongoDB local installation or a MongoDB Atlas database

## Setup
1. Open this `hari-college-backend` folder in VS Code.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `MONGODB_URI` and a long random `JWT_SECRET`.
4. Start MongoDB (if using local MongoDB).
5. Run `npm run dev`.
6. Check `http://localhost:5000/api/health`.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check API status |
| POST | `/api/auth/login` | Student/admin login; body: `{ "username":"...", "email":"...", "password":"..." }` |
| GET | `/api/auth/me` | Current account; requires `Authorization: Bearer <token>` |
| POST | `/api/auth/forgot-password` | Safe placeholder until email delivery is configured |
| POST | `/api/enquiries` | Save a contact/admission enquiry; body: `{ "name":"...", "email":"...", "subject":"...", "message":"..." }` |
| GET | `/api/enquiries` | List enquiries; admin token required |
| GET | `/api/results/:registerNumber?semester=1` | Return a published result |
| POST | `/api/payments/create-order` | Create a pending fee request; body: `{ "studentName":"...", "registerNumber":"...", "feeType":"Tuition Fee", "amount":1000 }` |
| GET | `/api/courses` | List sample BA/BSc courses |
| GET | `/api/events` | Events placeholder |

## Create the first admin
Add these temporary values to `.env`:

```
SEED_ADMIN_EMAIL=admin@your-college-domain.edu
SEED_ADMIN_PASSWORD=use-a-unique-password-at-least-12-chars
```

Run `npm run seed`, then remove the seed password from `.env`. Add student accounts through a verified admin-only registration workflow before real use. Do not publish sample credentials.

## Important production notes
- This is a backend starter, not a production-ready college ERP. Add admin-only CRUD routes for courses, events, calendars, placements and results, audit logs, backups, email delivery, stronger validation, and deployment secrets management.
- Results are returned only when `published: true`. Insert verified official result records using a trusted admin process; never expose unpublished results.
- The payment endpoint only creates a pending record. It does not accept card/UPI details or collect money. Integrate a payment gateway such as Razorpay on the server, verify signed webhooks, and mark payments paid only after verified gateway confirmation.
- Forgot-password currently returns a generic response; implement expiring single-use reset tokens and a trusted email provider before enabling it.
- Use HTTPS, a strong unique JWT secret, restricted CORS origins, secure hosting, and database access controls before deployment.

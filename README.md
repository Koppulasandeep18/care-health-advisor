# Care Health Advisor — Full Stack

## Frontend
From the project root:
```bash
npm install
npm run dev
```
Frontend: http://localhost:5173

## Backend
Open a second terminal:
```bash
cd server
npm install
copy .env.example .env
```

Edit `server/.env` and set:
```env
MONGODB_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5173
PORT=5000
```

Then:
```bash
npm run dev
```

Backend: http://localhost:5000
Health check: http://localhost:5000/api/health

## What is connected
The website's Free Consultation form now sends:
- name
- mobile
- requirement

to `POST /api/leads`, which stores each enquiry in MongoDB.

## MongoDB Atlas
Create a database/user in MongoDB Atlas, allow the IP address used by your deployment, and place the connection string in `server/.env`.

Do not commit `.env` or database credentials to GitHub.

## Next production step
Add an authenticated advisor dashboard for viewing leads and changing status (new/contacted/follow-up/converted/closed). Do not expose lead records publicly.

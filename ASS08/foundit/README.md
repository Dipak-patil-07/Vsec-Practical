# FoundIt - Campus Lost & Found

React (Vite) + Tailwind CSS frontend, Express + MongoDB backend.

## Setup

1. Start MongoDB (local `mongod`, or create a free MongoDB Atlas cluster).
2. Backend:
   ```
   cd server
   npm install
   copy .env.example .env      (Mac/Linux: cp .env.example .env)
   npm start
   ```
   Put your MongoDB connection string in `MONGO_URI` inside `.env`.
3. Frontend (new terminal):
   ```
   cd client
   npm install
   npm run dev
   ```
4. Open http://localhost:5173

## API

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/items | Get all items |
| POST | /api/items | Add a new item |
| DELETE | /api/items/:id | Delete an item by ID |

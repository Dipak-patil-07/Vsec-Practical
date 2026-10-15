# CampusKart (Simple Version)

Second-hand marketplace for engineering students.
React (Vite) + Tailwind CSS frontend, Express + MongoDB backend.

## Run

1. Start MongoDB (local, or put your Atlas string in `server/.env`).
2. Terminal 1:
   ```
   cd server
   npm install
   npm start
   ```
3. Terminal 2:
   ```
   cd client
   npm install
   npm run dev
   ```
4. Open http://localhost:5173

## Pages (4 + login)

| Route | File | What it does |
|-------|------|--------------|
| (logged out) | pages/Auth.jsx | Login and Sign Up in one page |
| / | pages/Marketplace.jsx | Banner, counts, search, category buttons, item cards |
| /item/:id | pages/ItemDetail.jsx | One item, call/WhatsApp, report seller |
| /sell | pages/Sell.jsx | Form to post an item with a photo |
| /profile | pages/Profile.jsx | Your details and your listings (mark sold, delete) |

Other files: `App.jsx` (routes + logged-in user), `components/Navbar.jsx`, `components/ItemCard.jsx`,
`api.js` (one small fetch helper), `constants.js` (lists like categories).

## API (8 routes)

| Method | Route | Purpose |
|--------|-------|---------|
| POST | /api/signup | Create account (password is hashed) |
| POST | /api/login | Login |
| GET | /api/items | All items (banned sellers hidden) |
| GET | /api/items/:id | One item |
| POST | /api/items | Add item |
| PUT | /api/items/:id/sold | Mark item as sold |
| DELETE | /api/items/:id | Delete item |
| POST | /api/reports | Report a seller |

## Flow example: posting an item

1. `Sell.jsx` - you fill the form. Each field has its own `useState`.
2. The photo is shrunk in the browser and kept as text in the `image` state.
3. On submit, `sendRequest("/api/items", "POST", {...})` (in `api.js`) calls `fetch`.
4. Vite sends `/api` calls to the Express server (see `vite.config.js`).
5. `server.js` checks the data, adds seller details, and saves it with `insertOne`.
6. `Marketplace.jsx` loads `/api/items` inside `useEffect` and shows cards with `.map()`.

## Report and ban rule

3 reports from 3 different students bans the seller automatically.
To unban someone, open MongoDB Compass, database `campuskart`:
set `banned` to `false` in `users` and delete that roll no's documents from `reports`.

# OwnAI (Assessment)

## Prerequisites

- Node.js (v16+ recommended) and npm installed.
---

## All Command to Install dep
- npm i formik
- npm i axios
- npm install -D tailwindcss@3 postcss autoprefixer
  npx tailwindcss init -p
- npm i react-router-dom

## Project structure

- `Backend/` — Express API and Mongoose models
- `Frontend/` — React (Vite) application with Tailwind CSS

Key files:
- `Backend/Server.js` — backend entry
- `Backend/routes/auth.js` — authentication routes (register, login, /me, /all)
- `Backend/models/User.js` — user model
- `Frontend/src` — React source files
- `Frontend/vite.config.js` — dev proxy for `/api` -> `http://localhost:5000`


## Run (development)

# install deps (frontend)
npm i
cd Frontend
npm i
cd ..
Open two terminals.


/*Terminal 1 — start backend:*/

# npm run dev #directly(Without going inside Backend Folder)
powershell
# from project root
npm run dev
# npm run dev 



/*Terminal 2 — start frontend:*/

powershell
cd Frontend
npm run dev

- Frontend dev server will be available at `http://localhost:5173` by default.
- Backend API will run at `http://localhost:5000` (or the`PORT`you set).
- Vite is configured to proxy `/api` calls to `http://localhost:5000` so frontend code can call `/api/...` directly.





# MERN Portfolio Website - Rishik

A fully responsive, modern portfolio website built with the MERN stack.  
This project includes a premium frontend UI/UX and a backend contact API that stores messages in MongoDB.

## Features

- Premium responsive UI with glassmorphism and gradient sections
- Dark/Light mode toggle with local storage persistence
- Framer Motion animations and typing animation hero text
- Skills section with icons and animated progress bars
- Projects section with images, tech stack, GitHub, and Live Demo buttons
- Contact form integrated with Express + MongoDB (`POST /api/contact`)
- Auto-generated professional cover letter section
- Loader animation and scroll-to-top floating button
- SEO meta tags in the frontend

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Icons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose

## Folder Structure

```text
Rishikimage/
  client/   # React frontend
  server/   # Express backend
```

## Environment Variables

### `server/.env`

Copy from `server/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_db
CLIENT_URL=http://localhost:5173
```

### `client/.env`

Copy from `client/.env.example`:

```env
VITE_API_URL=http://localhost:5000
```

## Run Locally

### 1) Backend setup

```bash
cd server
npm install
cp .env.example .env
# Update .env with real Mongo URI
npm run dev
```

### 2) Frontend setup (new terminal)

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173` and backend at `http://localhost:5000`.

## API

### `POST /api/contact`

Request body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Your message here"
}
```

Response:

```json
{
  "success": true,
  "message": "Message submitted successfully",
  "data": {}
}
```

## Deployment

### Deploy Frontend on Vercel

1. Push code to GitHub.
2. Import repository in Vercel.
3. Set root directory as `client`.
4. Add environment variable:
   - `VITE_API_URL=https://your-render-backend-url.onrender.com`
5. Deploy.

### Deploy Backend on Render

1. Create a new **Web Service** in Render.
2. Select repository and set root directory to `server`.
3. Build command:
   - `npm install`
4. Start command:
   - `npm start`
5. Add environment variables:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_connection_string`
   - `CLIENT_URL=https://your-vercel-app-url.vercel.app`
6. Deploy and copy backend URL.

## Notes

- Replace placeholder project live links (`example.com`) in `client/src/App.jsx` with your actual deployed project links.
- You can customize skill percentages, project cards, and cover letter text in the same file.

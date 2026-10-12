# Taskflow — MERN To-Do List

A full-stack task manager built for **23CSB40B — Web Technology, Assignment 2**. It uses MongoDB, Express.js, React, and Node.js. Tasks are stored in MongoDB, so they remain after refresh.

## Features

- Create tasks with required, trimmed titles.
- View all tasks when the page loads.
- Mark tasks complete/incomplete; completed tasks appear struck through.
- Delete tasks.
- React state updates the interface without a full page reload.
- REST API with appropriate validation and HTTP status codes.
- CORS restricted to the configured frontend origin.
- Separate backend/frontend folders and feature branches.

## Project structure

```text
.
├── backend/
│   ├── models/Task.js
│   ├── routes/tasks.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/components/TaskForm.jsx
│   ├── src/components/TaskItem.jsx
│   ├── src/components/TaskList.jsx
│   ├── src/App.jsx
│   ├── src/main.jsx
│   ├── src/styles.css
│   ├── index.html
│   ├── package.json
│   └── .env.example
└── .gitignore
```

## Requirements

- Node.js 18 or later and npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## Run locally

### 1. Configure MongoDB and the backend

Open a terminal in the project root:

```bash
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env`, then set `MONGO_URI` to your local MongoDB URI or Atlas connection string. Keep the real `.env` file private.

Example `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_todo
FRONTEND_ORIGIN=http://localhost:5173
```

Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health` for a health response.

### 2. Start the React frontend

In a second terminal, from the project root:

```bash
cd frontend
npm install
```

Copy `frontend/.env.example` to `frontend/.env`. The default API URL is `http://localhost:5000/api`.

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Keep MongoDB and both servers running while testing.

## REST API

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | Fetch all tasks |
| POST | `/api/tasks` | Create a task; JSON body: `{"title":"Study DBMS"}` |
| PUT | `/api/tasks/:id` | Update `title` and/or `completed` |
| DELETE | `/api/tasks/:id` | Delete a task |

Task schema: `title` (required String), `completed` (Boolean, defaults to false), and `createdAt` (Date, defaults to now). Empty titles are rejected with HTTP 400; missing tasks return HTTP 404; successful creation returns HTTP 201.

## Git workflow

Backend work is in `feature/backend`; frontend work is in `feature/frontend`. Each branch is integrated into `main` through a pull request. Commit history uses descriptive messages.

## Before submission

- Run both servers with MongoDB and test add, complete, and delete.
- Capture 2–3 screenshots of the working app and one screenshot of the merged pull requests.
- Keep `.env` and `node_modules` out of Git.
- Create the requested ZIP without either `node_modules` folder or real `.env` files before uploading to Google Classroom.

## Notes

The application source is provided for learning and assignment use. Test the complete app locally with your own MongoDB configuration before submission. No database credentials are committed.

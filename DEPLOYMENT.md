# Deployment guide (Render + MongoDB Atlas)

This repository is configured for a Render Blueprint with two services:

- Backend: `karthik-taskflow-api` (Node/Express, root directory `backend`)
- Frontend: `karthik-taskflow-frontend` (Vite static site, root directory `frontend`)

## 1. Create the MongoDB Atlas database

1. Sign in to MongoDB Atlas and create a free cluster if you do not already have one.
2. Open **Database Access** and create a database user with a username and password. Save the password privately.
3. Open **Network Access** and add `0.0.0.0/0` so Render can reach the cluster. Use a narrower allowlist if you have a supported stable egress IP option.
4. Open your cluster, choose **Connect → Drivers → Node.js**, and copy the connection string.
5. Replace the username/password placeholders. Add `/mern_todo` before any query string if the database name is not already present.
6. If the password contains special characters, URL-encode them. Do not share the connection string in chat or commit it to GitHub.

A connection string has this general shape (this is only an example):
`mongodb+srv://USERNAME:PASSWORD@cluster-address/mern_todo?retryWrites=true&w=majority`

## 2. Set the backend environment variable in Render

If the Render services already exist:

1. Open the **karthik-taskflow-api** service in Render.
2. Open **Environment**.
3. Add or update the variable named `MONGO_URI`.
4. Paste the complete Atlas connection string as its value and save.
5. Confirm `FRONTEND_ORIGIN` is set to `https://karthik-taskflow-frontend.onrender.com`.
6. Save changes and let Render redeploy the backend.

If you are creating the services for the first time, use **New → Blueprint**, select this repository and the `main` branch, and provide `MONGO_URI` when Render asks for the secret.

## 3. Run locally (optional)

From the `backend` folder, copy `.env.example` to `.env` and set `MONGO_URI` to your local MongoDB URL or Atlas connection string. Then run:

```bash
npm install
npm run dev
```

In a second terminal, from the `frontend` folder:

```bash
npm install
npm run dev
```

The frontend uses `http://localhost:5000/api` by default. To use another backend URL, set `VITE_API_URL` in `frontend/.env`.

## 4. Verify the deployment

- Backend health: `https://karthik-taskflow-api.onrender.com/api/health`
- Expected response after the database connects: `{"status":"ok","database":"connected"}`
- Frontend: `https://karthik-taskflow-frontend.onrender.com`

On the frontend, add a task, refresh the page, mark it complete, and delete it. Refreshing should preserve tasks that remain in the database.

## Security

- Never commit `backend/.env`, Atlas passwords, or production connection strings.
- Keep `backend/.env` ignored by Git.
- If credentials are exposed, change the Atlas database user's password immediately.
- The backend starts only after it has connected to MongoDB. Its startup log will show a clear error if `MONGO_URI` is missing or malformed.

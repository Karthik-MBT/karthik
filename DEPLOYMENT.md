# Deployment guide (Render + MongoDB Atlas)

This repository is configured for a Render Blueprint with two services:

- Backend: `karthik-taskflow-api` (Node/Express, root directory `backend`)
- Frontend: `karthik-taskflow-frontend` (Vite static site, root directory `frontend`)

## 1. Prepare MongoDB Atlas

1. In Atlas, create a database user (Database Access).
2. In Network Access, add `0.0.0.0/0` for this Render deployment, or use a narrower allowlist if you have a supported stable egress IP option.
3. In your cluster, choose Connect → Drivers → Node.js and copy the SRV connection string.
4. Replace the password placeholder locally in your password manager; do not commit the URI or put it in source code. URL-encode reserved characters in the password.
5. The database name used by this app can be `mern_todo`.

## 2. Create the Render deployment

1. Sign in to Render and choose New → Blueprint.
2. Connect the GitHub repository `Karthik-MBT/karthik` and select the `main` branch.
3. Render reads `render.yaml` and proposes the backend and frontend services.
4. When prompted for `MONGO_URI`, paste the Atlas SRV connection string with database name `mern_todo`.
5. Create the Blueprint and wait for both services to deploy.

## 3. Verify

- Backend health: `https://karthik-taskflow-api.onrender.com/api/health` (expected JSON: `{"status":"ok"}`)
- Frontend: `https://karthik-taskflow-frontend.onrender.com`
- Add a task, refresh the page, mark it complete, and delete it to verify database persistence and API behavior.

## Security

- Never commit `backend/.env`, Atlas passwords, or production connection strings.
- If credentials are exposed, rotate the Atlas database user's password immediately.
- Atlas requires both a database user and an IP access-list entry for connections.

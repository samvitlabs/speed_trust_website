# Southern Pothigai Frontend

Next.js + Tailwind site for Southern Pothigai Environmental & Educational Trust with mock APIs for demos.

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Docker

```bash
docker-compose up --build
```

## API Reference

All endpoints live under `http://localhost:3000/api` when the dev server is running.

### POST /api/login
Body:
```json
{ "email": "member@southernpothigai.org", "password": "speedtrust123" }
```
Returns `{ message, user }` on success.

### POST /api/contact
Body requires `name`, `email`, `message`. Returns `{ message, requestId }`.

### POST /api/consultation
Body requires `name`, `email`, `datetime`, `domain`, `subdomain`, `message`. Returns `{ message, requestId }`.

### GET /api/events
Returns `{ message, events }` from `data/events.json`.

### GET /api/courses
Returns `{ message, courses }` from `data/courses.json`.

Use curl:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Visitor","email":"me@example.com","message":"Hello"}'
```

Mock data lives in `frontend/data`. Extend/replace with live integrations as needed.

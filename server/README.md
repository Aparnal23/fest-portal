# Fest Portal – API server

Express + MongoDB + JWT.

| Method | Route | Access |
|---|---|---|
| POST | `/api/auth/register` | public |
| POST | `/api/auth/login` | public |
| GET | `/api/events` | public |
| GET | `/api/events/:id` | public |
| POST/PUT/DELETE | `/api/events/:id` | admin |
| POST | `/api/registrations` | signed in |
| GET | `/api/registrations/my` | signed in |
| DELETE | `/api/registrations/:id` | signed in |
| GET | `/api/registrations` | admin |

Protected routes need the header `Authorization: Bearer <token>`.

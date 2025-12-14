# Sweet Shop Management System

## Overview
The Sweet Shop Management System is a full-stack web application designed to manage sweets inventory, purchases, and administration.  
It demonstrates REST API design, authentication, role-based access control, Test-Driven Development (TDD), and a modern React-based frontend.


## Tech Stack
**Backend**
- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Jest & Supertest

**Frontend**
- React
- TypeScript
- Vite
- Axios

**DevOps & Tools**
- Git & GitHub
- Prisma Studio


## Features
- User registration and login with JWT authentication
- Role-based authorization (User / Admin)
- Sweet inventory management (CRUD)
- Search sweets by name, category, and price range
- Purchase sweets with real-time stock updates
- Admin-only restocking and deletion
- Fully tested backend using TDD
- Responsive React SPA frontend


## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Sweets (Protected)
- POST /api/sweets
- GET /api/sweets
- GET /api/sweets/search
- PUT /api/sweets/:id
- DELETE /api/sweets/:id (Admin only)

### Inventory
- POST /api/sweets/:id/purchase
- POST /api/sweets/:id/restock (Admin only)


## Database Design
- User (id, name, email, password, role)
- Sweet (id, name, category, price, quantity)

PostgreSQL is used as the persistent database, with Prisma ORM handling migrations and queries.


## Setup & Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### Backend Setup
cd backend
npm install
npx prisma migrate dev
npm run dev

### Frontend Setup
cd frontend
npm install
npm run dev


## Running Tests
cd backend
npm test

## Frontend Usage
## Screenshots
## My AI Usage
## Future Improvements

## My AI Usage

I used AI tools (primarily ChatGPT) as a development assistant throughout this project.

### How AI Was Used
- To scaffold initial boilerplate for Express controllers, services, and React components
- To generate initial unit and integration test cases
- To validate REST API design and TDD workflow
- To debug errors and improve code structure

### How I Ensured Code Quality
- All AI-generated code was reviewed, modified, and integrated manually
- Business logic, validations, and architectural decisions were made by me
- Tests were written and verified locally before committing

### Impact on Workflow
AI significantly improved development speed and helped maintain clean architecture, while still requiring strong understanding and ownership of the codebase.

## Test Report
All backend APIs are covered by automated tests using Jest and Supertest.
All test suites pass successfully, covering authentication, sweet CRUD operations, and inventory management.

## Deployment
The application can be deployed using:
- Backend: Render / Railway
- Frontend: Vercel / Netlify


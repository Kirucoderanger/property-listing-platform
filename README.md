# Property Listing Platform

A full-stack multi-tenant property listing platform that allows users to browse properties, property owners to manage listings, and administrators to monitor platform activity.

## Live Demo

### Frontend

https://property-listing-platform-ten.vercel.app

### Backend API

https://property-listing-platform-8vmn.onrender.com

### Swagger Documentation

https://property-listing-platform-8vmn.onrender.com/api

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (RBAC)
* Protected Routes
* User Profile Retrieval

### User Features

* Browse Published Properties
* View Property Details
* Search Properties
* Filter Properties by Location
* Filter Properties by Price Range
* Add Properties to Favorites
* Remove Properties from Favorites
* View Favorite Properties

### Property Owner Features

* Create Property Listings
* Upload Property Images
* Edit Draft Properties
* Publish Properties
* Soft Delete Properties
* View Owned Properties

### Admin Features

* View Platform Metrics
* Total Users Count
* Total Properties Count
* Published Properties Count
* Draft Properties Count

### Image Management

* Cloudinary Integration
* Secure Image Uploads
* Multiple Property Images
* Image Validation

---

## Technology Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Axios
* TanStack Query
* Tailwind CSS

### Backend

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Passport.js
* Swagger

### Database

* PostgreSQL

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: PostgreSQL
* Image Storage: Cloudinary

---

## Project Structure

property-listing-platform/

├── frontend/

│   ├── app/

│   ├── components/

│   ├── hooks/

│   ├── lib/

│   └── providers/

│

└── backend/

```
├── src/

│   ├── auth/

│   ├── property/

│   ├── favorite/

│   ├── admin/

│   ├── upload/

│   └── prisma/

│

└── prisma/
```

---

## API Modules

### Auth Module

* POST /auth/register
* POST /auth/login
* GET /auth/profile

### Property Module

* POST /properties
* GET /properties
* GET /properties/:id
* PATCH /properties/:id
* PATCH /properties/:id/publish
* DELETE /properties/:id
* GET /properties/my-properties

### Favorites Module

* POST /favorites/:propertyId
* DELETE /favorites/:propertyId
* GET /favorites

### Admin Module

* GET /admin/metrics

### Upload Module

* POST /upload

---

## Environment Variables

### Backend (.env)

FRONTEND_URL=https://property-listing-platform-ten.vercel.app

### Frontend (.env.local)

NEXT_PUBLIC_API_URL=https://property-listing-platform-8vmn.onrender.com

---

## Installation

### Clone Repository

git clone https://github.com/Kirucoderanger/property-listing-platform.git

cd property-listing-platform

### Backend Setup

cd backend

npm install

npx prisma generate

npx prisma migrate dev

npm run start:dev

Backend runs on:

http://localhost:5000

### Frontend Setup

cd frontend

npm install

npm run dev

Frontend runs on:

http://localhost:3000

---

## Security Features

* JWT Authentication
* Protected API Endpoints
* Role-Based Authorization
* Input Validation
* DTO Validation
* Password Hashing
* CORS Protection
* Soft Delete Strategy

---

## Future Enhancements

* Property Booking System
* Real-Time Notifications
* Property Reviews & Ratings
* Advanced Search Filters
* Google Maps Integration
* Payment Integration
* Email Notifications
* Property Analytics Dashboard

---

## Author

Kirubel Lemu

Software Developer

GitHub:
https://github.com/Kirucoderanger

LinkedIn:
https://www.linkedin.com

---

## License

This project is licensed under the MIT License.

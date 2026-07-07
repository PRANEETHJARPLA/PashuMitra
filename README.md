# PashuMitra 🐄

A livestock marketplace platform connecting farmers and buyers — built as a full-stack MERN application.

**Live app:** https://pashu-mitra-phi.vercel.app
**Live API:** https://pashumitra-api.onrender.com

## Features

- Browse animal listings with search and filters (category, location, price range)
- View detailed listing pages with photos and seller contact info
- User authentication (signup/login) with JWT
- Create, edit, and delete your own listings (ownership-protected)
- Photo upload via Cloudinary
- Responsive UI built with Tailwind CSS

## Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router, Axios
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
**Image Storage:** Cloudinary
**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Project Structure

PashuMitra/
- client/ — React frontend
- server/ — Express backend

## Running Locally

### Prerequisites

- Node.js installed
- A MongoDB Atlas account (or local MongoDB)
- A Cloudinary account (for photo uploads)

### Backend Setup

Navigate to the server folder and install dependencies:

cd server
npm install

Create a .env file in server/ with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Run the server:

npm run dev

### Frontend Setup

Navigate to the client folder and install dependencies:

cd client
npm install

Create a .env file in client/ with:

VITE_API_URL=http://localhost:5000/api

Run the frontend:

npm run dev

## Roadmap

This marketplace is the first module of a larger planned livestock ecosystem, including:

- Veterinary consultation booking
- Medicine and feed marketplace
- Livestock insurance
- Animal health record system with QR codes
- Artificial insemination service booking
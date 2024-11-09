# Crypto Mining Simulator - Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:5000/api
MONGODB_URI=mongodb://localhost:27017/crypto-miner
JWT_SECRET=your-super-secret-key-change-in-production
NODE_ENV=development
PORT=5000
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

The application consists of two parts: the frontend (Vite + React) and the backend (Express.js).

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev:all
```

This will start:
- Frontend at `http://localhost:5173`
- Backend at `http://localhost:5000`

### Running Separately

To run the frontend only:
```bash
npm run dev
```

To run the backend only:
```bash
npm run server
```

## API Testing

The application includes test endpoints to verify functionality:

- `GET /api/test/ping` - Public endpoint
- `GET /api/test/protected` - Protected endpoint (requires authentication)
- `GET /api/test/error` - Error handling test
- `GET /health` - Server health check

## Project Structure

```
├── src/                  # Frontend source code
│   ├── api/             # API configuration
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── store/          # State management
│   └── utils/          # Utility functions
├── server/              # Backend source code
│   ├── config/         # Server configuration
│   ├── middleware/     # Express middleware
│   ├── models/         # MongoDB models
│   └── routes/         # API routes
└── package.json        # Project dependencies
```

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server with nodemon
- `npm run dev:all` - Run both frontend and backend
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm start` - Start production server

## Authentication

The application uses JWT for authentication. After registration/login, the token is:
- Stored in localStorage
- Automatically included in API requests
- Handled by axios interceptors for 401 responses
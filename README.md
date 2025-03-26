# NegotiateAI - AI-Powered Negotiation Coach

NegotiateAI is an application designed to help users improve their negotiation skills through AI-powered analysis and feedback. The application analyzes negotiation text, provides feedback, and offers improved versions of negotiation messages.

## Project Structure

The project consists of two main components:

1. **Frontend** (`negotiation-coach/`): A React application built with TypeScript, Material UI, and Redux
2. **Backend** (`backend/`): A Node.js API service built with Express, TypeScript, and MongoDB

## Features

- User authentication and profile management
- Negotiation text analysis with industry-specific models
- AI-powered improvement suggestions for negotiation text
- Feedback collection and statistics
- Secure API key management
- Data persistence with MongoDB

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- OpenAI API key

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/negotiateai
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   OPENAI_API_KEY=your_openai_api_key
   NODE_ENV=development
   ```

4. Start MongoDB (if using local MongoDB):
   ```
   mongod
   ```

5. Start the backend server:
   ```
   npm run dev
   ```

   The server will be available at http://localhost:5001

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd negotiation-coach
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5001/api
   REACT_APP_OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the frontend development server:
   ```
   npm start
   ```

   The application will be available at http://localhost:3000

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get JWT token
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Analysis

- `POST /api/analysis` - Create a new analysis (protected)
- `GET /api/analysis` - Get all analyses for the current user (protected)
- `GET /api/analysis/:id` - Get a specific analysis by ID (protected)
- `DELETE /api/analysis/:id` - Delete an analysis (protected)
- `POST /api/analysis/improve` - Get improved version of negotiation text (protected)

### Feedback

- `POST /api/feedback` - Submit feedback for an analysis (protected)
- `GET /api/feedback` - Get all feedback for the current user (protected)
- `GET /api/feedback/stats` - Get feedback statistics (protected)

## Security Notes

- Never commit `.env` files to version control
- Generate new API keys if they are ever exposed
- Use environment variables for sensitive information
- The backend handles API key security to prevent exposure in the frontend

## Development

### Backend

- `npm run dev` - Start the server with nodemon for hot-reloading
- `npm run build` - Build the TypeScript code
- `npm start` - Start the server from the built code

### Frontend

- `npm start` - Start the development server
- `npm run build` - Build the production version
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

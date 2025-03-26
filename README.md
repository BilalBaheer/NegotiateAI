# NegotiateAI - AI-Powered Negotiation Coach

NegotiateAI is an advanced web application designed to help users improve their negotiation skills through AI-powered analysis and feedback. The application analyzes negotiation text, provides feedback, and offers improved versions of negotiation messages.

## Project Structure

The project consists of two main components:

1. **Frontend** (`negotiation-coach/`): A React application built with TypeScript, Material UI, and Redux
2. **Backend** (`backend/`): A Node.js API service built with Express, TypeScript, and MongoDB

## Features

- **AI-Powered Text Analysis**: Get comprehensive analysis of your negotiation text with specific feedback on tone, clarity, and persuasiveness.
- **Performance Scoring**: Receive objective scoring on multiple dimensions of your negotiation approach and track improvements over time.
- **AI Suggestions**: Get intelligent suggestions to improve your negotiation text, tailored to your specific industry and context.
- **Industry-Specific Models**: Customized analysis based on your industry, whether it's sales, legal, real estate, or business development.
- **Secure Processing**: Enterprise-grade security for all your negotiation data with secure API integration.
- **User Authentication**: Secure login and signup system with JWT authentication.
- **Comparative Analysis**: Side-by-side comparison of original and improved text with detailed breakdown of enhancements.
- **User Feedback System**: Rate AI suggestions and improvements to help the system learn and improve over time.
- **Feedback Statistics**: View aggregated feedback statistics to understand how the AI is learning from user input.

## Recent Updates

### March 2025 Updates
- **User Authentication System**: Implemented a complete login and signup system with MongoDB Atlas integration.
- **AI Feedback System**: Integrated a comprehensive feedback system allowing users to rate both analysis results and improved text suggestions.
- **Feedback Statistics Dashboard**: Added a new page to display aggregated feedback statistics, showcasing how user input helps improve the AI.
- **Improved Scoring Algorithm**: Enhanced the AI scoring system to ensure meaningful improvements between original and improved text.
- **Dashboard Enhancements**: Added a new section to the Dashboard that introduces the feedback system and explains its importance to users.

## Technology Stack

### Frontend
- React with TypeScript
- Material UI for component design
- Redux Toolkit for state management
- Axios for API requests
- React Router for navigation

### Backend
- Node.js with Express
- TypeScript for type safety
- MongoDB with Mongoose for data persistence
- JWT for authentication
- OpenAI API for text analysis

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

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
- **User Authentication**: Secure login and signup system with JWT authentication and MongoDB Atlas for persistent data storage.
- **Comparative Analysis**: Side-by-side comparison of original and improved text with detailed breakdown of enhancements.
- **User Feedback System**: Rate AI suggestions and improvements to help the system learn and improve over time.
- **Feedback Statistics**: View aggregated feedback statistics to understand how the AI is learning from user input.

## Recent Updates

### March 2025 Updates
- **Enhanced Authentication Security**: Implemented HTTP-only cookies for secure token storage instead of localStorage, providing protection against XSS attacks.
- **User Authentication System**: Implemented a complete login and signup system with MongoDB Atlas integration for persistent user data storage.
- **Protected Routes**: Added route protection to ensure only authenticated users can access application features.
- **Responsive Header**: Updated the header component to dynamically display login/signup options or user profile based on authentication status.
- **Token-Based Authentication**: Implemented JWT token-based authentication with secure HTTP-only cookies.
- **User Session Management**: Added automatic session checking to maintain user state across page refreshes.
- **Backend API Security**: Enhanced API security with proper authentication middleware and MongoDB connection.
- **AI Feedback System**: Integrated a comprehensive feedback system allowing users to rate both analysis results and improved text suggestions.
- **Feedback Statistics Dashboard**: Added a new page to display aggregated feedback statistics, showcasing how user input helps improve the AI.
- **Improved Scoring Algorithm**: Enhanced the AI scoring system to ensure meaningful improvements between original and improved text.
- **Dashboard Enhancements**: Added a new section to the Dashboard that introduces the feedback system and explains its importance to users.

## Technology Stack

### Frontend
- React with TypeScript
- Material UI for component design
- Redux for state management
- React Router for navigation
- Axios for API requests
- JWT for authentication

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose ODM
- JWT for authentication
- OpenAI API for text analysis
- Bcrypt for password hashing
- Cookie-parser for HTTP-only cookie management

## Authentication System

The application uses a secure authentication system with the following features:

1. **User Registration**: New users can create an account with name, email, and password
2. **Secure Login**: Existing users can log in with email and password
3. **JWT Authentication**: Tokens are used to authenticate API requests
4. **HTTP-only Cookies**: Authentication tokens are stored in HTTP-only cookies instead of localStorage for enhanced security
5. **CORS Configuration**: Properly configured CORS with credentials support for cookie-based authentication
6. **Protected Routes**: Only authenticated users can access certain parts of the application
7. **Persistent Sessions**: User sessions are maintained across page refreshes using secure cookies
8. **MongoDB Atlas Integration**: User data is securely stored in MongoDB Atlas cloud database
9. **Password Security**: Passwords are hashed using bcrypt before storage
10. **Secure Logout**: Server-side logout that properly invalidates the authentication cookie

### Security Advantages of HTTP-only Cookies

The application now uses HTTP-only cookies for authentication instead of localStorage, which provides several security benefits:

- **Protection Against XSS Attacks**: HTTP-only cookies cannot be accessed by JavaScript, protecting tokens from cross-site scripting attacks
- **Automatic HTTPS Enforcement**: In production, cookies are configured to only be sent over secure HTTPS connections
- **Automatic Expiration**: Cookies can be configured with expiration dates that are enforced by the browser
- **SameSite Protection**: Cookies are configured with SameSite attributes to prevent CSRF attacks
- **Server-side Control**: The server has more control over authentication tokens, including the ability to invalidate them

## Security Enhancements

We've recently made significant security improvements to the authentication system:

1. **Enhanced Authentication Security**: Switched from localStorage to HTTP-only cookies for token storage, providing robust protection against XSS attacks.

2. **Token-Based Authentication**: Implemented JWT tokens stored in secure HTTP-only cookies instead of localStorage.

3. **Backend Improvements**:
   - Added cookie-parser middleware for HTTP-only cookie management
   - Configured proper CORS settings with credentials support for cookie-based authentication
   - Implemented server-side logout that properly invalidates authentication cookies

4. **Security Advantages of HTTP-only Cookies**:
   - Protection against XSS (Cross-Site Scripting) attacks as JavaScript cannot access HTTP-only cookies
   - Automatic HTTPS enforcement in production environments
   - Automatic expiration handling enforced by the browser
   - SameSite attribute configuration to prevent CSRF attacks
   - Better server-side control over authentication tokens, including invalidation capabilities

5. **Authentication Flow**:
   - Tokens are now sent to the client via HTTP-only cookies instead of in the response body
   - All authenticated API requests automatically include the cookie
   - The auth middleware now checks for tokens in cookies first, with a fallback to Authorization headers

These enhancements significantly improve the application's security posture by addressing common web vulnerabilities and following security best practices for authentication systems.

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get JWT token
- `POST /api/users/logout` - Logout and clear JWT cookie
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

## Development

### Backend
- The backend runs on port 5002 by default
- API routes are prefixed with `/api`
- Authentication routes are at `/api/users`
- Analysis routes are at `/api/analysis`

### Frontend
- The frontend runs on port 3000 by default
- Protected routes redirect to the login page if the user is not authenticated
- The application uses Redux for state management with separate slices for user and analysis data

## Security Considerations

- JWT tokens are stored in HTTP-only cookies for authentication
- API keys are stored only on the server side in environment variables
- Passwords are hashed before storage in the database
- MongoDB connection string includes credentials that should be kept secure

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account (or local MongoDB installation)
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/negotiateai.git
cd negotiateai
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../negotiation-coach
npm install
```

4. Create environment files
   - Create `.env` in the `backend` directory with the required environment variables
   - Create `.env` in the `negotiation-coach` directory with the required environment variables

5. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd negotiation-coach
npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

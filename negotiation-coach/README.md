# AI Negotiation Coach

![AI Negotiation Coach](public/logo192.png)

## Overview

AI Negotiation Coach is an advanced web application designed to help users improve their negotiation skills through AI-powered text analysis. The application provides detailed feedback, scoring, and suggestions to improve negotiation communications across various industries.

## Features

- **AI-Powered Text Analysis**: Get comprehensive analysis of your negotiation text with specific feedback on tone, clarity, and persuasiveness.
- **Performance Scoring**: Receive objective scoring on multiple dimensions of your negotiation approach and track improvements over time.
- **AI Suggestions**: Get intelligent suggestions to improve your negotiation text, tailored to your specific industry and context.
- **Industry-Specific Models**: Customized analysis based on your industry, whether it's sales, legal, real estate, or business development.
- **Secure Processing**: Enterprise-grade security for all your negotiation data with secure API integration.
- **Optimized Text Improvement**: Fast and efficient text improvement with comparative analysis showing exactly how your text has improved.
- **Comparative Analysis**: Side-by-side comparison of original and improved text with detailed breakdown of enhancements.
- **User Feedback System**: Rate AI suggestions and improvements to help the system learn and improve over time.
- **Feedback Statistics**: View aggregated feedback statistics to understand how the AI is learning from user input.

## Recent Updates

### March 2025 Updates
- **AI Feedback System**: Integrated a comprehensive feedback system allowing users to rate both analysis results and improved text suggestions.
- **Feedback Statistics Dashboard**: Added a new page to display aggregated feedback statistics, showcasing how user input helps improve the AI.
- **Improved Scoring Algorithm**: Enhanced the AI scoring system to ensure meaningful improvements between original and improved text, with minimum improvement thresholds based on original text quality.
- **Dashboard Enhancements**: Added a new section to the Dashboard that introduces the feedback system and explains its importance to users.
- **UI Improvements**: Implemented collapsible feedback sections using accordions for a cleaner user interface.
- **Navigation Updates**: Improve the Header component with links to the new feedback statistics page.
- **Performance Optimization**: Significantly improved the speed of text analysis and improvement by combining multiple API calls into a single, optimized request.
- **Enhanced UI**: Improved the display of analysis results and text improvements for better user experience.
- **Robust Error Handling**: Added comprehensive error handling to ensure reliability even when API calls fail.
- **Improved State Management**: Improved Redux state management to properly handle analysis results and improved text simultaneously.

## Technology Stack

- **Frontend**: React, TypeScript, Material-UI
- **State Management**: Redux Toolkit
- **API Integration**: OpenAI API for text analysis
- **Local Storage**: Temporary storage for feedback data (to be replaced with backend integration)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/BilalBaheer/NegotiateAI.git
   cd negotiation-coach
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

1. **Analyze Text**: Navigate to the Analysis page and enter your negotiation text.
2. **Select Industry**: Choose the industry that best matches your negotiation context.
3. **Get Analysis**: Submit your text to receive a detailed analysis with scores and suggestions.
4. **Improve Text**: Review the AI-generated suggestions and implement improvements.
5. **Provide Feedback**: Rate the quality of AI suggestions and improvements to help the system learn.
6. **View Feedback Stats**: Navigate to the Feedback Stats page to see how user feedback is helping improve the AI.
7. **Track Progress**: View your history to track improvement over time.

## Project Structure

```
negotiation-coach/
├── public/                 # Public assets
├── src/
│   ├── components/         # React components
│   │   ├── analysis/       # Analysis-related components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── feedback/       # Feedback-related components
│   │   └── layout/         # Layout components
│   ├── models/             # Industry models
│   ├── pages/              # Page components
│   ├── services/           # API services
│   │   ├── aiService.ts    # AI analysis service
│   │   └── feedbackService.ts # Feedback handling service
│   ├── store/              # Redux store
│   │   └── slices/         # Redux slices
│   ├── theme.ts            # Theme configuration
│   └── index.tsx           # Application entry point
├── .env                    # Environment variables
└── package.json            # Dependencies
```

## Future Impreovements

- **Backend Integration**: Replace localStorage with a backend service for storing and retrieving feedback data.
- **User Authentication**: Implement user authentication to secure the feedback submission process.
- **Enhanced Feedback Visualization**: Add charts and graphs to better visualize feedback statistics.
- **Personalized Recommendations**: Use feedback data to provide personalized recommendations based on user preferences.
- **AI Model Fine-tuning**: Utilize feedback data to fine-tune the AI models for better performance.

## Deployment

To build the application for production:

```
npm run build
```

This creates a `build` folder with optimized production files that can be deployed to any static hosting service.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

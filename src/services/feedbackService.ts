import axios from 'axios';

/**
 * Interface for feedback data
 */
export interface FeedbackData {
  analysisId: string;
  rating: number;
  comment?: string;
  modelId: string;
  suggestionType: 'analysis' | 'improvement';
  originalText: string;
  improvedText?: string;
  timestamp: string;
}

/**
 * Service for handling user feedback on AI suggestions
 */
const feedbackService = {
  /**
   * Submit user feedback for an AI suggestion
   * 
   * @param feedback The feedback data to submit
   * @returns Promise resolving to the submission result
   */
  submitFeedback: async (feedback: FeedbackData): Promise<{ success: boolean; message: string }> => {
    try {
      // In a production environment, this would send the feedback to your backend
      // For now, we'll log it and store it in localStorage for demonstration
      console.log('Feedback submitted:', feedback);
      
      // Store in localStorage
      const storedFeedback = localStorage.getItem('ai_feedback');
      const feedbackArray = storedFeedback ? JSON.parse(storedFeedback) : [];
      feedbackArray.push(feedback);
      localStorage.setItem('ai_feedback', JSON.stringify(feedbackArray));
      
      // This would be replaced with an actual API call in production
      // Example:
      // const response = await axios.post('/api/feedback', feedback);
      // return response.data;
      
      return { 
        success: true, 
        message: 'Feedback submitted successfully. Thank you for helping improve our AI!' 
      };
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return { 
        success: false, 
        message: 'Failed to submit feedback. Please try again later.' 
      };
    }
  },
  
  /**
   * Get all feedback for analysis
   * 
   * @returns Promise resolving to an array of feedback data
   */
  getFeedback: async (): Promise<FeedbackData[]> => {
    try {
      // In production, this would fetch from your backend
      // For now, we'll retrieve from localStorage
      const storedFeedback = localStorage.getItem('ai_feedback');
      return storedFeedback ? JSON.parse(storedFeedback) : [];
    } catch (error) {
      console.error('Error getting feedback:', error);
      return [];
    }
  },
  
  /**
   * Get aggregated feedback statistics
   * 
   * @returns Promise resolving to feedback statistics
   */
  getFeedbackStats: async (): Promise<{ 
    averageRating: number; 
    totalFeedback: number;
    modelRatings: Record<string, number>;
    suggestionTypeRatings: Record<string, number>;
  }> => {
    try {
      const feedback = await feedbackService.getFeedback();
      
      if (feedback.length === 0) {
        return {
          averageRating: 0,
          totalFeedback: 0,
          modelRatings: {},
          suggestionTypeRatings: {}
        };
      }
      
      // Calculate average rating
      const sum = feedback.reduce((acc, item) => acc + item.rating, 0);
      const averageRating = sum / feedback.length;
      
      // Calculate ratings by model
      const modelRatings: Record<string, { sum: number; count: number }> = {};
      const suggestionTypeRatings: Record<string, { sum: number; count: number }> = {};
      
      feedback.forEach(item => {
        // Process model ratings
        if (!modelRatings[item.modelId]) {
          modelRatings[item.modelId] = { sum: 0, count: 0 };
        }
        modelRatings[item.modelId].sum += item.rating;
        modelRatings[item.modelId].count += 1;
        
        // Process suggestion type ratings
        if (!suggestionTypeRatings[item.suggestionType]) {
          suggestionTypeRatings[item.suggestionType] = { sum: 0, count: 0 };
        }
        suggestionTypeRatings[item.suggestionType].sum += item.rating;
        suggestionTypeRatings[item.suggestionType].count += 1;
      });
      
      // Convert to average ratings
      const modelAverages: Record<string, number> = {};
      Object.entries(modelRatings).forEach(([key, value]) => {
        modelAverages[key] = value.sum / value.count;
      });
      
      const suggestionTypeAverages: Record<string, number> = {};
      Object.entries(suggestionTypeRatings).forEach(([key, value]) => {
        suggestionTypeAverages[key] = value.sum / value.count;
      });
      
      return {
        averageRating,
        totalFeedback: feedback.length,
        modelRatings: modelAverages,
        suggestionTypeRatings: suggestionTypeAverages
      };
    } catch (error) {
      console.error('Error getting feedback stats:', error);
      return {
        averageRating: 0,
        totalFeedback: 0,
        modelRatings: {},
        suggestionTypeRatings: {}
      };
    }
  }
};

export default feedbackService;

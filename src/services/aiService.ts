import axios from 'axios';

// OpenAI API configuration
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Industry-specific model contexts
const INDUSTRY_CONTEXTS = {
  general: 'general business negotiations',
  legal: 'legal contract negotiations',
  sales: 'sales and pricing negotiations',
  procurement: 'procurement and vendor negotiations',
  recruitment: 'job offer and salary negotiations'
};

// Negotiation frameworks and strategies
const NEGOTIATION_FRAMEWORKS = {
  batna: 'Best Alternative To a Negotiated Agreement',
  zopa: 'Zone Of Possible Agreement',
  anchoring: 'Strategic first offer to set expectations',
  interestBased: 'Focus on underlying interests rather than positions',
  winWin: 'Mutually beneficial outcomes',
  harvard: 'Harvard Principled Negotiation Method'
};

// Expert negotiation techniques
const EXPERT_TECHNIQUES = [
  'Mirroring - Repeat the last few words to encourage elaboration',
  'Labeling - Name emotions to defuse or reinforce them',
  'Open-ended questions - Use "what" and "how" to gather information',
  'Strategic silence - Pause to encourage the other party to fill the void',
  'Calculated empathy - Show understanding of the other side\'s position',
  'Calibrated questions - Questions that begin with "How" or "What" to solve problems',
  'Non-cash value creation - Find items of different value to each party',
  'Tactical empathy - Understanding the other side\'s perspective to influence them'
];

/**
 * Analysis result interface
 */
export interface AnalysisResult {
  score: number;
  tone: string;
  sentiment: string;
  persuasiveStrength: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  frameworksUsed?: string[];
  techniquesIdentified?: string[];
  powerDynamics?: string;
  negotiationPhase?: string;
}

/**
 * Analyzes negotiation text and provides feedback
 * @param text The negotiation text to analyze
 * @param modelId The industry-specific model to use
 * @returns Analysis result with scores and suggestions
 */
export const analyzeText = async (text: string, modelId: string): Promise<AnalysisResult> => {
  if (!text.trim()) {
    throw new Error('Text is required for analysis');
  }

  try {
    const industryContext = getIndustryContext(modelId);
    
    // Generate a random session ID to ensure each analysis is treated as unique
    const sessionId = Math.random().toString(36).substring(2, 15);
    
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are the world's foremost expert on negotiation techniques, with decades of experience in ${industryContext} and deep knowledge of negotiation psychology, game theory, and persuasion tactics.

Your task is to analyze the negotiation text with the precision and insight of a master negotiator, providing comprehensive and actionable feedback.

Your analysis must include:

1. An overall effectiveness score from 0-100 based on these criteria:
   - Clarity and conciseness (15 points)
   - Persuasive language and rhetoric (15 points)
   - Professional tone and relationship building (15 points)
   - Strategic positioning and framing (15 points)
   - Addressing counterparty concerns and objections (15 points)
   - Effective use of negotiation techniques (15 points)
   - Clear call to action and next steps (10 points)
   
2. Tone analysis (assertive, passive, collaborative, etc.)
3. Sentiment analysis (positive, negative, neutral)
4. Persuasive strength as a percentage from 0-100
5. Key strengths (3-5 specific points about what works well)
6. Areas for improvement (3-5 specific points about what could be better)
7. Specific tactical suggestions to make the text more effective (3-5 actionable points)
8. Negotiation frameworks identified in the text (BATNA, ZOPA, etc.)
9. Expert techniques used or missing (mirroring, labeling, etc.)
10. Power dynamics assessment (who appears to have leverage)
11. Negotiation phase identification (preparation, information exchange, bargaining, closing)

Apply the following expert negotiation principles in your analysis:
- Harvard Principled Negotiation Method (separate people from the problem, focus on interests not positions, invent options for mutual gain, insist on objective criteria)
- Chris Voss's tactical empathy and calibrated questions
- Robert Cialdini's principles of influence (reciprocity, commitment/consistency, social proof, authority, liking, scarcity)
- Game theory concepts of information asymmetry and credible commitments
- Cultural sensitivity and awareness in international negotiations

This is analysis session ${sessionId} - evaluate this text independently and objectively.

Format your response as a JSON object with the following structure:
{
  "score": number,
  "tone": string,
  "sentiment": string,
  "persuasiveStrength": number,
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[],
  "frameworksUsed": string[],
  "techniquesIdentified": string[],
  "powerDynamics": string,
  "negotiationPhase": string
}

ONLY return the JSON object, nothing else.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    try {
      // Try to parse the response as JSON
      const content = response.data.choices[0].message.content;
      console.log("Raw API response:", content);
      
      // Try to parse the entire content as JSON first
      try {
        const analysisResult = JSON.parse(content);
        console.log("Successfully parsed full response as JSON");
        return analysisResult;
      } catch (fullParseError) {
        // If that fails, try to extract JSON from the content
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          const jsonStr = jsonMatch[0];
          const analysisResult = JSON.parse(jsonStr);
          console.log("Successfully extracted and parsed JSON from response");
          return analysisResult;
        } else {
          console.warn('Could not extract JSON from response, using mock data');
          return getMockAnalysis(text, modelId);
        }
      }
    } catch (parseError) {
      console.error('Error parsing analysis result:', parseError);
      return getMockAnalysis(text, modelId);
    }
  } catch (error) {
    console.error('Error analyzing text:', error);
    return getMockAnalysis(text, modelId);
  }
};

/**
 * Gets improved version of negotiation text
 * @param originalText The original negotiation text
 * @param modelId The industry-specific model to use
 * @returns Improved version of the text
 */
export const getImprovedText = async (originalText: string, modelId: string): Promise<string> => {
  if (!originalText.trim()) {
    throw new Error('Text is required for improvement');
  }

  try {
    const industryContext = getIndustryContext(modelId);
    
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are the world's leading expert on negotiation, with unparalleled mastery of persuasion psychology, strategic communication, and ${industryContext}. 

Your task is to completely transform the following negotiation text into a masterpiece of persuasive communication that achieves optimal outcomes while maintaining relationship integrity.

Apply these advanced negotiation principles:

1. STRATEGIC FRAMING
   - Frame proposals in terms of the counterparty's interests and values
   - Use loss aversion by highlighting what they might miss rather than gain
   - Create a compelling narrative that makes your position seem inevitable

2. PSYCHOLOGICAL TRIGGERS
   - Incorporate Cialdini's principles: reciprocity, commitment, social proof, authority, liking, scarcity
   - Use strategic anchoring to set favorable expectations
   - Apply tactical empathy to demonstrate deep understanding

3. LINGUISTIC EXCELLENCE
   - Replace weak language with confident, authoritative phrasing
   - Use precise, concrete language instead of vague generalities
   - Employ rhetorical techniques (tricolon, anaphora, etc.) for memorability
   - Balance assertiveness with collaborative language

4. STRUCTURAL MASTERY
   - Open with a relationship-building statement that establishes common ground
   - Present your strongest points first and last (primacy-recency effect)
   - Include a clear, specific call to action with timeline
   - Anticipate and preemptively address potential objections

5. TACTICAL ELEMENTS
   - Incorporate subtle reciprocity triggers
   - Use strategic concessions to activate commitment/consistency
   - Include social proof elements relevant to the counterparty
   - Establish your authority and credibility naturally
   - Create appropriate scarcity or urgency without being manipulative

6. RELATIONSHIP BUILDING
   - Demonstrate genuine understanding of their position
   - Emphasize mutual benefits and long-term relationship value
   - Use "we" language to create a collaborative atmosphere
   - Acknowledge their expertise and contributions

The improved text must be substantially more effective while maintaining authenticity and ethical standards. It should represent the pinnacle of negotiation expertise applied to this specific situation.

ONLY return the improved text, with no additional commentary or explanations.`
          },
          {
            role: 'user',
            content: originalText
          }
        ],
        temperature: 0.4,
        max_tokens: 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const improvedText = response.data.choices[0].message.content.trim();
    return improvedText;
  } catch (error) {
    console.error('Error getting improved text:', error);
    return getMockImprovedText(originalText);
  }
};

/**
 * Helper function to get industry-specific context
 */
const getIndustryContext = (industryModelId: string): string => {
  return INDUSTRY_CONTEXTS[industryModelId as keyof typeof INDUSTRY_CONTEXTS] || INDUSTRY_CONTEXTS.general;
};

/**
 * Mock functions for development without API key
 */
const getMockAnalysis = (text: string, industryModelId: string): AnalysisResult => {
  return {
    score: 75,
    tone: 'Collaborative',
    sentiment: 'Positive',
    persuasiveStrength: 70,
    strengths: [
      'Clear communication of objectives',
      'Professional tone throughout',
      'Good use of supporting evidence',
      'Addresses potential concerns proactively'
    ],
    weaknesses: [
      'Could be more concise in some sections',
      'Missing specific examples in key areas',
      'Some arguments could be stronger',
      'Limited use of persuasive techniques'
    ],
    suggestions: [
      'Add more specific data points to strengthen your position',
      'Consider addressing the timeline more explicitly',
      'Include a clearer call to action at the end',
      'Incorporate more reciprocity principles to build rapport'
    ],
    frameworksUsed: [
      'Interest-based negotiation',
      'Harvard Principled Negotiation',
      'BATNA (Best Alternative To a Negotiated Agreement)'
    ],
    techniquesIdentified: [
      'Tactical empathy',
      'Mirroring',
      'Calibrated questions',
      'Strategic silence'
    ],
    powerDynamics: 'Balanced with slight advantage to counterparty',
    negotiationPhase: 'Bargaining'
  };
};

const getMockImprovedText = (originalText: string): string => {
  return `${originalText}\n\n[This would be an improved version of your text with better structure, more persuasive language, and clearer points. In the real application, this would be generated by the AI.]`;
};

export default {
  analyzeText,
  getImprovedText
};

import mongoose, { Document, Schema } from 'mongoose';
import { AnalysisResult } from '../services/aiService';

export interface IAnalysis extends Document {
  user: mongoose.Types.ObjectId;
  text: string;
  industryModelId: string;
  results: AnalysisResult;
  createdAt: Date;
  updatedAt: Date;
}

const AnalysisSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    industryModelId: {
      type: String,
      required: true,
      default: 'general'
    },
    results: {
      score: {
        type: Number,
        required: true
      },
      tone: {
        type: String,
        required: true
      },
      sentiment: {
        type: String,
        required: true
      },
      persuasiveStrength: {
        type: Number,
        required: true
      },
      strengths: [{
        type: String,
        required: true
      }],
      weaknesses: [{
        type: String,
        required: true
      }],
      suggestions: [{
        type: String,
        required: true
      }],
      frameworksUsed: [{
        type: String
      }],
      techniquesIdentified: [{
        type: String
      }],
      powerDynamics: {
        type: String
      },
      negotiationPhase: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IAnalysis>('Analysis', AnalysisSchema);

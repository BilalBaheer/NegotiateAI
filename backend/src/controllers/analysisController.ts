import { Request, Response } from 'express';
import Analysis from '../models/Analysis';
import aiService from '../services/aiService';

/**
 * Analyze negotiation text
 * @route POST /api/analysis
 * @access Private
 */
export const createAnalysis = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, industryModelId } = req.body;
    const userId = req.user?._id;

    if (!text || !userId) {
      res.status(400).json({
        success: false,
        message: 'Please provide text for analysis and ensure you are logged in'
      });
      return;
    }

    // Call AI service to analyze text
    const analysisResult = await aiService.analyzeText(text, industryModelId || 'general');

    // Create and save the analysis
    const analysis = await Analysis.create({
      user: userId,
      text,
      industryModelId: industryModelId || 'general',
      results: analysisResult,
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      data: analysis
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to analyze text',
      error: error.message
    });
  }
};

/**
 * Get improved version of negotiation text
 * @route POST /api/analysis/improve
 * @access Private
 */
export const improveText = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, industryModelId } = req.body;
    const userId = req.user?._id;

    if (!text || !userId) {
      res.status(400).json({
        success: false,
        message: 'Please provide text to improve and ensure you are logged in'
      });
      return;
    }

    // Call AI service to get improved text
    const improvedText = await aiService.getImprovedText(text, industryModelId || 'general');

    res.status(200).json({
      success: true,
      data: {
        originalText: text,
        improvedText
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to improve text',
      error: error.message
    });
  }
};

/**
 * Get all analyses for the current user
 * @route GET /api/analysis
 * @access Private
 */
export const getAnalyses = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    const analyses = await Analysis.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: analyses.length,
      data: analyses
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analyses',
      error: error.message
    });
  }
};

/**
 * Get a single analysis by ID
 * @route GET /api/analysis/:id
 * @access Private
 */
export const getAnalysisById = async (req: Request, res: Response): Promise<void> => {
  try {
    const analysisId = req.params.id;
    const userId = req.user?._id;

    const analysis = await Analysis.findById(analysisId);

    if (!analysis) {
      res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
      return;
    }

    // Ensure the user owns this analysis
    if (analysis.user.toString() !== userId?.toString()) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to access this analysis'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analysis',
      error: error.message
    });
  }
};

/**
 * Delete an analysis
 * @route DELETE /api/analysis/:id
 * @access Private
 */
export const deleteAnalysis = async (req: Request, res: Response): Promise<void> => {
  try {
    const analysisId = req.params.id;
    const userId = req.user?._id;

    const analysis = await Analysis.findById(analysisId);

    if (!analysis) {
      res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
      return;
    }

    // Ensure the user owns this analysis
    if (analysis.user.toString() !== userId?.toString()) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this analysis'
      });
      return;
    }

    await analysis.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Analysis deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete analysis',
      error: error.message
    });
  }
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnalysis = exports.getAnalysisById = exports.getAnalyses = exports.improveText = exports.createAnalysis = void 0;
const Analysis_1 = __importDefault(require("../models/Analysis"));
const aiService_1 = require("../services/aiService");
/**
 * Analyze negotiation text
 * @route POST /api/analysis
 * @access Private
 */
const createAnalysis = async (req, res) => {
    try {
        const { text, modelId } = req.body;
        if (!text || !modelId) {
            res.status(400).json({
                success: false,
                message: 'Text and modelId are required'
            });
            return;
        }
        // Call AI service to analyze text
        const analysisResult = await (0, aiService_1.analyzeText)(text, modelId);
        // Create new analysis in database
        const analysis = await Analysis_1.default.create({
            userId: req.user._id,
            originalText: text,
            modelId,
            ...analysisResult
        });
        res.status(201).json({
            success: true,
            analysis
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.createAnalysis = createAnalysis;
/**
 * Get improved version of negotiation text
 * @route POST /api/analysis/improve
 * @access Private
 */
const improveText = async (req, res) => {
    try {
        const { text, modelId, analysisId } = req.body;
        if (!text || !modelId) {
            res.status(400).json({
                success: false,
                message: 'Text and modelId are required'
            });
            return;
        }
        // Call AI service to get improved text
        const improvedText = await (0, aiService_1.getImprovedText)(text, modelId);
        // If analysisId is provided, update the analysis with improved text
        if (analysisId) {
            await Analysis_1.default.findByIdAndUpdate(analysisId, { improvedText }, { new: true });
        }
        res.json({
            success: true,
            improvedText
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.improveText = improveText;
/**
 * Get all analyses for the current user
 * @route GET /api/analysis
 * @access Private
 */
const getAnalyses = async (req, res) => {
    try {
        const analyses = await Analysis_1.default.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json({
            success: true,
            count: analyses.length,
            analyses
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.getAnalyses = getAnalyses;
/**
 * Get a single analysis by ID
 * @route GET /api/analysis/:id
 * @access Private
 */
const getAnalysisById = async (req, res) => {
    try {
        const analysis = await Analysis_1.default.findById(req.params.id);
        if (!analysis) {
            res.status(404).json({
                success: false,
                message: 'Analysis not found'
            });
            return;
        }
        // Check if the analysis belongs to the user
        if (analysis.userId.toString() !== req.user._id.toString()) {
            res.status(403).json({
                success: false,
                message: 'Not authorized to access this analysis'
            });
            return;
        }
        res.json({
            success: true,
            analysis
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.getAnalysisById = getAnalysisById;
/**
 * Delete an analysis
 * @route DELETE /api/analysis/:id
 * @access Private
 */
const deleteAnalysis = async (req, res) => {
    try {
        const analysis = await Analysis_1.default.findById(req.params.id);
        if (!analysis) {
            res.status(404).json({
                success: false,
                message: 'Analysis not found'
            });
            return;
        }
        // Check if the analysis belongs to the user
        if (analysis.userId.toString() !== req.user._id.toString()) {
            res.status(403).json({
                success: false,
                message: 'Not authorized to delete this analysis'
            });
            return;
        }
        await analysis.deleteOne();
        res.json({
            success: true,
            message: 'Analysis deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.deleteAnalysis = deleteAnalysis;

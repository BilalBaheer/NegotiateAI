"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedbackStats = exports.getFeedback = exports.submitFeedback = void 0;
const Feedback_1 = __importDefault(require("../models/Feedback"));
const Analysis_1 = __importDefault(require("../models/Analysis"));
/**
 * Submit feedback for an analysis
 * @route POST /api/feedback
 * @access Private
 */
const submitFeedback = async (req, res) => {
    try {
        const { analysisId, rating, comment, modelId, suggestionType } = req.body;
        if (!analysisId || !rating || !modelId || !suggestionType) {
            res.status(400).json({
                success: false,
                message: 'AnalysisId, rating, modelId, and suggestionType are required'
            });
            return;
        }
        // Check if analysis exists
        const analysis = await Analysis_1.default.findById(analysisId);
        if (!analysis) {
            res.status(404).json({
                success: false,
                message: 'Analysis not found'
            });
            return;
        }
        // Create new feedback
        const feedback = await Feedback_1.default.create({
            userId: req.user._id,
            analysisId,
            rating,
            comment,
            modelId,
            suggestionType
        });
        res.status(201).json({
            success: true,
            feedback
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.submitFeedback = submitFeedback;
/**
 * Get all feedback for the current user
 * @route GET /api/feedback
 * @access Private
 */
const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback_1.default.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json({
            success: true,
            count: feedback.length,
            feedback
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.getFeedback = getFeedback;
/**
 * Get feedback statistics
 * @route GET /api/feedback/stats
 * @access Private
 */
const getFeedbackStats = async (req, res) => {
    try {
        // Get all feedback for the user
        const feedback = await Feedback_1.default.find({ userId: req.user._id });
        if (feedback.length === 0) {
            res.json({
                success: true,
                stats: {
                    averageRating: 0,
                    totalFeedback: 0,
                    modelRatings: {},
                    suggestionTypeRatings: {}
                }
            });
            return;
        }
        // Calculate average rating
        const sum = feedback.reduce((acc, item) => acc + item.rating, 0);
        const averageRating = sum / feedback.length;
        // Calculate ratings by model
        const modelRatings = {};
        const suggestionTypeRatings = {};
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
        const modelAverages = {};
        Object.entries(modelRatings).forEach(([key, value]) => {
            modelAverages[key] = value.sum / value.count;
        });
        const suggestionTypeAverages = {};
        Object.entries(suggestionTypeRatings).forEach(([key, value]) => {
            suggestionTypeAverages[key] = value.sum / value.count;
        });
        res.json({
            success: true,
            stats: {
                averageRating,
                totalFeedback: feedback.length,
                modelRatings: modelAverages,
                suggestionTypeRatings: suggestionTypeAverages
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.getFeedbackStats = getFeedbackStats;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    // Log error for dev
    console.error(err);
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        res.status(404).json({
            success: false,
            message
        });
        return;
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        res.status(400).json({
            success: false,
            message
        });
        return;
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(', ');
        res.status(400).json({
            success: false,
            message
        });
        return;
    }
    // Return response with error
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error'
    });
};
exports.errorHandler = errorHandler;

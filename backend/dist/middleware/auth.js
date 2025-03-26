"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    let token;
    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // Check if token exists
    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
        return;
    }
    try {
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        // Get user from database
        const user = await User_1.default.findById(decoded.id).select('-password');
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return;
        }
        // Set user in request object
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
        return;
    }
};
exports.protect = protect;
// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({
            success: false,
            message: 'Not authorized as an admin'
        });
        return;
    }
};
exports.admin = admin;

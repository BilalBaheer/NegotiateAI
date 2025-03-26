"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
/**
 * Register a new user
 * @route POST /api/users/register
 * @access Public
 */
const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        // Check if user already exists
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({
                success: false,
                message: 'User already exists'
            });
            return;
        }
        // Create new user
        const user = await User_1.default.create({
            email,
            password,
            name
        });
        if (user) {
            res.status(201).json({
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token: (0, generateToken_1.default)(user)
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Invalid user data'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.registerUser = registerUser;
/**
 * Authenticate user & get token
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User_1.default.findOne({ email });
        // Check if user exists and password matches
        if (user && (await user.comparePassword(password))) {
            res.json({
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token: (0, generateToken_1.default)(user)
            });
        }
        else {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.loginUser = loginUser;
/**
 * Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user._id).select('-password');
        if (user) {
            res.json({
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.getUserProfile = getUserProfile;
/**
 * Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }
            const updatedUser = await user.save();
            res.json({
                success: true,
                user: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role
                },
                token: (0, generateToken_1.default)(updatedUser)
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
exports.updateUserProfile = updateUserProfile;

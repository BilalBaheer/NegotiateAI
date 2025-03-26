import { Request, Response, CookieOptions } from 'express';
import User, { IUser } from '../models/User';
import generateToken from '../utils/generateToken';

// Cookie options for JWT token
const cookieOptions: CookieOptions = {
  httpOnly: true, // Cannot be accessed by client-side JavaScript
  secure: process.env.NODE_ENV === 'production', // Only sent over HTTPS in production
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Prevents CSRF attacks
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  path: '/' // Available across the entire site
};

/**
 * Register a new user
 * @route POST /api/users/register
 * @access Public
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        success: false,
        message: 'User already exists'
      });
      return;
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name
    });

    if (user) {
      // Generate token
      const token = generateToken(user);
      
      // Set HTTP-only cookie
      res.cookie('token', token, cookieOptions);
      
      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid user data'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

/**
 * Authenticate user & get token
 * @route POST /api/users/login
 * @access Public
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.comparePassword(password))) {
      // Generate token
      const token = generateToken(user);
      
      // Set HTTP-only cookie
      res.cookie('token', token, cookieOptions);
      
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

/**
 * Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id).select('-password');

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
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

/**
 * Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      // Generate token
      const token = generateToken(updatedUser);
      
      // Set HTTP-only cookie
      res.cookie('token', token, cookieOptions);
      
      res.json({
        success: true,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

/**
 * Logout user and clear cookie
 * @route POST /api/users/logout
 * @access Public
 */
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Clear the JWT cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/'
    });
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

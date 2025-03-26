"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const database_1 = __importDefault(require("./config/database"));
const config_1 = __importDefault(require("./config/config"));
const error_1 = require("./middleware/error");
// Import routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const analysisRoutes_1 = __importDefault(require("./routes/analysisRoutes"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes"));
// Connect to MongoDB
(0, database_1.default)();
// Initialize Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/analysis', analysisRoutes_1.default);
app.use('/api/feedback', feedbackRoutes_1.default);
// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is running',
        environment: config_1.default.nodeEnv,
        timestamp: new Date().toISOString()
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    (0, error_1.errorHandler)(err, req, res, next);
});
// Start server
const PORT = config_1.default.port;
app.listen(PORT, () => {
    console.log(`Server running in ${config_1.default.nodeEnv} mode on port ${PORT}`);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    // Close server & exit process
    process.exit(1);
});

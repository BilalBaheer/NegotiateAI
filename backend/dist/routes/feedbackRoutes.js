"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedbackController_1 = require("../controllers/feedbackController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All routes require authentication
router.route('/')
    .post(auth_1.protect, feedbackController_1.submitFeedback)
    .get(auth_1.protect, feedbackController_1.getFeedback);
router.get('/stats', auth_1.protect, feedbackController_1.getFeedbackStats);
exports.default = router;

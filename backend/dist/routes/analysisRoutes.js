"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analysisController_1 = require("../controllers/analysisController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All routes require authentication
router.route('/')
    .post(auth_1.protect, analysisController_1.createAnalysis)
    .get(auth_1.protect, analysisController_1.getAnalyses);
router.post('/improve', auth_1.protect, analysisController_1.improveText);
router.route('/:id')
    .get(auth_1.protect, analysisController_1.getAnalysisById)
    .delete(auth_1.protect, analysisController_1.deleteAnalysis);
exports.default = router;

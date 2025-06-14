"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageController_1 = require("../../controllers/imageController");
const upload_1 = require("../../middleware/upload");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// Test route
router.get("/test", (req, res) => {
    res.json({ message: "API is working" });
});
// GET /api/placeholder - Generate placeholder image
router.get("/placeholder", async (req, res) => {
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (isNaN(width) || isNaN(height)) {
        res.status(400).json({ error: "Invalid dimensions" });
        return;
    }
    const filename = `${width}x${height}.png`;
    const url = await (0, imageController_1.generatePlaceholderImage)(width, height, filename);
    res.json({ url });
});
// POST /api/upload - Upload JPG only
router.post("/upload", (req, res) => {
    upload_1.upload.single("image")(req, res, (err) => {
        if (err instanceof Error) {
            return res.status(400).json({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        res.json({
            filename: req.file.filename,
            url: `/images/${req.file.filename}`,
        });
    });
});
// GET /api/resize - Resize image
router.get("/resize", async (req, res) => {
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const imageName = req.query.image;
    console.log("Resize request for image:", imageName, "width:", width, "height:", height);
    if (!imageName || isNaN(width) || isNaN(height)) {
        res.status(400).json({ error: "Missing or invalid parameters" });
        return;
    }
    try {
        const url = await (0, imageController_1.resizeImage)(imageName, width, height);
        res.json({ url });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Resize error:", error.message);
            if (error.message === "Original image not found") {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Failed to resize image" });
            }
        }
        else {
            console.error("Unknown error during resize:", error);
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
// GET /api/images - List available images in public/images
router.get("/images", (req, res) => {
    const imagesDir = path_1.default.join(__dirname, "../../../public/images");
    fs_1.default.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Failed to list images" });
        }
        // Only return image files
        const imageFiles = files.filter((file) => /\.(jpe?g)$/i.test(file));
        res.json(imageFiles);
    });
});
exports.default = router;

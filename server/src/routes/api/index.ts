import express, { Request, Response, Router } from "express";
import { generatePlaceholderImage } from "../../controllers/imageController";
import { upload } from "../../middleware/upload";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const router: Router = express.Router();

router.get("/test", (req: Request, res: Response) => {
    res.json({ message: "API is working" });
});

// GET /api/placeholder
router.get("/placeholder", async (req: Request, res: Response): Promise<void> => {
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (isNaN(width) || isNaN(height)) {
        res.status(400).json({ error: "Invalid dimensions" });
        return;
    }

    const filename = `${width}x${height}.png`;
    const url = await generatePlaceholderImage(width, height, filename);
    res.json({ url });
});

// POST /api/upload
router.post("/upload", upload.single("image"), (req: Request, res: Response): void => {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
    }

    res.json({
        filename: req.file.filename,
        url: `/images/${req.file.filename}`,
    });
});

// GET /api/resize
router.get("/resize", async (req: Request, res: Response): Promise<void> => {
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const imageName = req.query.image as string;

    if (!imageName || isNaN(width) || isNaN(height)) {
        res.status(400).json({ error: "Missing or invalid parameters" });
        return;
    }

    const originalPath = path.join(__dirname, "../../public/images", imageName);
    const resizedName = `${width}x${height}-${imageName}`;
    const resizedPath = path.join(__dirname, "../../public/generated", resizedName);

    if (!fs.existsSync(originalPath)) {
        res.status(404).json({ error: "Original image not found" });
        return;
    }

    if (!fs.existsSync(resizedPath)) {
        await sharp(originalPath).resize(width, height).toFile(resizedPath);
    }

    res.json({ url: `/generated/${resizedName}` });
});

// List images

router.get("/images", (req: Request, res: Response) => {
    const imagesDir = path.join(__dirname, "../../../public/images");
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Failed to list images" });
        }
        // Filter for image files only 
        const imageFiles = files.filter((file) =>
            /\.(jpe?g|png|gif|bmp)$/i.test(file)
        );
        res.json(imageFiles);
    });
});

export default router;

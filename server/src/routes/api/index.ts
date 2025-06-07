import express, { Request, Response, Router } from "express";
import {
  generatePlaceholderImage,
  resizeImage,
} from "../../controllers/imageController";
import { upload } from "../../middleware/upload";
import fs from "fs";
import path from "path";

const router: Router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "API is working" });
});

// GET /api/placeholder
router.get(
  "/placeholder",
  async (req: Request, res: Response): Promise<void> => {
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (isNaN(width) || isNaN(height)) {
      res.status(400).json({ error: "Invalid dimensions" });
      return;
    }

    const filename = `${width}x${height}.png`;
    const url = await generatePlaceholderImage(width, height, filename);
    res.json({ url });
  },
);

// POST /api/upload
router.post(
  "/upload",
  upload.single("image"),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    res.json({
      filename: req.file.filename,
      url: `/images/${req.file.filename}`,
    });
  },
);

// GET /api/resize
router.get("/resize", async (req: Request, res: Response): Promise<void> => {
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  const imageName = req.query.image as string;

  console.log(
    "Resize request for image:",
    imageName,
    "width:",
    width,
    "height:",
    height,
  );

  if (!imageName || isNaN(width) || isNaN(height)) {
    res.status(400).json({ error: "Missing or invalid parameters" });
    return;
  }

  try {
    const url = await resizeImage(imageName, width, height);
    res.json({ url });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Resize error:", error.message);

      if (error.message === "Original image not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to resize image" });
      }
    } else {
      console.error("Unknown error during resize:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
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
      /\.(jpe?g|png|gif|bmp)$/i.test(file),
    );
    res.json(imageFiles);
  });
});

export default router;

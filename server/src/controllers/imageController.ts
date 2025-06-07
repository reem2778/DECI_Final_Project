import sharp from "sharp";
import path from "path";
import fs from "fs";

const imagesDir = path.join(__dirname, "../../public/images");
const outputDir = path.join(__dirname, "../../public/generated");

console.log("Files in imagesDir:", fs.readdirSync(imagesDir));

export const generatePlaceholderImage = async (
  width: number,
  height: number,
  filename: string,
): Promise<string> => {
  const filePath = path.join(outputDir, filename);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 220, g: 220, b: 220 },
    },
  })
    .png()
    .toFile(filePath);

  return `/generated/${filename}`;
};

export const resizeImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string> => {
  const originalPath = path.join(imagesDir, filename);
  const outputFilename = `${path.parse(filename).name}_${width}x${height}${path.extname(filename)}`;
  const outputPath = path.join(outputDir, outputFilename);

  if (!fs.existsSync(originalPath)) {
    throw new Error("Original image not found");
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await sharp(originalPath).resize(width, height).toFile(outputPath);

  return `/generated/${outputFilename}`;
};

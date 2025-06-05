import sharp from "sharp";
import path from "path";
import fs from "fs";

const outputDir = path.join(__dirname, "../../public/generated");

export const generatePlaceholderImage = async (
    width: number,
    height: number,
    filename: string
): Promise<string> => {
    const filePath = path.join(outputDir, filename);

    // Ensure the output directory exists
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

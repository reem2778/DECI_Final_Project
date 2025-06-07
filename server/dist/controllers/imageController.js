"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = exports.generatePlaceholderImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imagesDir = path_1.default.join(__dirname, "../../public/images");
const outputDir = path_1.default.join(__dirname, "../../public/generated");
console.log("Files in imagesDir:", fs_1.default.readdirSync(imagesDir));
const generatePlaceholderImage = async (width, height, filename) => {
    const filePath = path_1.default.join(outputDir, filename);
    if (!fs_1.default.existsSync(outputDir)) {
        fs_1.default.mkdirSync(outputDir, { recursive: true });
    }
    await (0, sharp_1.default)({
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
exports.generatePlaceholderImage = generatePlaceholderImage;
const resizeImage = async (filename, width, height) => {
    const originalPath = path_1.default.join(imagesDir, filename);
    const outputFilename = `${path_1.default.parse(filename).name}_${width}x${height}${path_1.default.extname(filename)}`;
    const outputPath = path_1.default.join(outputDir, outputFilename);
    if (!fs_1.default.existsSync(originalPath)) {
        throw new Error("Original image not found");
    }
    if (!fs_1.default.existsSync(outputDir)) {
        fs_1.default.mkdirSync(outputDir, { recursive: true });
    }
    await (0, sharp_1.default)(originalPath)
        .resize(width, height)
        .toFile(outputPath);
    return `/generated/${outputFilename}`;
};
exports.resizeImage = resizeImage;

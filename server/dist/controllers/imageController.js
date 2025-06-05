"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePlaceholderImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const outputDir = path_1.default.join(__dirname, "../../public/generated");
const generatePlaceholderImage = async (width, height, filename) => {
    const filePath = path_1.default.join(outputDir, filename);
    // Ensure the output directory exists
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

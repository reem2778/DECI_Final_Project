"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageController_1 = require("../controllers/imageController");
describe("Image Processing - resizeImage function", () => {
    const testFile = "test.jpg";
    const width = 100;
    const height = 100;
    const publicDir = path_1.default.join(__dirname, "../../public");
    const imagePath = path_1.default.join(publicDir, "images", testFile);
    beforeAll(() => {
        console.log("Does test image exist?", fs_1.default.existsSync(imagePath));
        console.log("Image path used in test:", imagePath);
        const exists = fs_1.default.existsSync(imagePath);
        if (!exists)
            throw new Error("Test image not found at: " + imagePath);
    });
    it("should resize image without throwing", async () => {
        try {
            await (0, imageController_1.resizeImage)(testFile, width, height);
        }
        catch (error) {
            fail("resizeImage threw an error");
        }
    });
    it("should generate resized image file", async () => {
        const outputUrl = await (0, imageController_1.resizeImage)(testFile, width, height);
        const expectedPath = path_1.default.join(__dirname, "../../public", outputUrl);
        const fallbackPath = path_1.default.join(__dirname, "../../../public", outputUrl);
        console.log("Checking expected path:", expectedPath);
        console.log("Checking fallback path:", fallbackPath);
        const exists = fs_1.default.existsSync(expectedPath) || fs_1.default.existsSync(fallbackPath);
        expect(exists).toBe(true);
    });
});

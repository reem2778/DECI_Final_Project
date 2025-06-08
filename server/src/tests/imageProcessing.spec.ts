import path from "path";
import fs from "fs";
import { resizeImage } from "../controllers/imageController";

describe("Image Processing - resizeImage function", () => {
  const testFile = "test.jpg";
  const width = 100;
  const height = 100;

  const publicDir = path.join(__dirname, "../../public");
  const imagePath = path.join(publicDir, "images", testFile);

  beforeAll(() => {
    console.log("Does test image exist?", fs.existsSync(imagePath));
    console.log("Image path used in test:", imagePath);
    const exists = fs.existsSync(imagePath);
    if (!exists) throw new Error("Test image not found at: " + imagePath);
  });

  it("should resize image without throwing", async () => {
    try {
      await resizeImage(testFile, width, height);
    } catch (error) {
      fail("resizeImage threw an error");
    }
  });

  it("should generate resized image file", async () => {
    const outputUrl = await resizeImage(testFile, width, height);

    const expectedPath = path.join(__dirname, "../../public", outputUrl);
    const fallbackPath = path.join(__dirname, "../../../public", outputUrl);

    console.log("Checking expected path:", expectedPath);
    console.log("Checking fallback path:", fallbackPath);

    const exists = fs.existsSync(expectedPath) || fs.existsSync(fallbackPath);
    expect(exists).toBe(true);
  });
});

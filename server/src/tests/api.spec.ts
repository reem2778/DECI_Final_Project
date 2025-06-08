import request from "supertest";
import app from "../app";
import path from "path";

describe("Image API Endpoints", () => {
  describe("Image API Endpoints", () => {
    it("should upload an image", async () => {
      const testImagePath = path.join(
        __dirname,
        "../../public/images/test.jpg"
      );

      const res = await request(app)
        .post("/api/upload")
        .attach("image", testImagePath);

      expect(res.status).toBe(200);
      expect(res.body.filename).toBeDefined();
      expect(res.body.url).toBeDefined();
    });
  });

  it("should generate placeholder image URL", async () => {
    const res = await request(app)
      .get("/api/placeholder")
      .query({ width: 100, height: 100 });

    expect(res.status).toBe(200);
    expect(res.body.url).toContain("/generated/");
  });

  it("should resize an existing image", async () => {
    const imageName = "test.jpg";

    const res = await request(app)
      .get("/api/resize")
      .query({ image: imageName, width: 150, height: 150 });

    expect(res.status).toBe(200);
    expect(res.body.url).toContain("/generated/");
  });

  it("should list available images", async () => {
    const res = await request(app).get("/api/images");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const path_1 = __importDefault(require("path"));
describe("Image API Endpoints", () => {
    describe("Image API Endpoints", () => {
        it("should upload an image", async () => {
            const testImagePath = path_1.default.join(__dirname, "../../public/images/test.jpg");
            const res = await (0, supertest_1.default)(app_1.default)
                .post("/api/upload")
                .attach("image", testImagePath);
            expect(res.status).toBe(200);
            expect(res.body.filename).toBeDefined();
            expect(res.body.url).toBeDefined();
        });
    });
    it("should generate placeholder image URL", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get("/api/placeholder")
            .query({ width: 100, height: 100 });
        expect(res.status).toBe(200);
        expect(res.body.url).toContain("/generated/");
    });
    it("should resize an existing image", async () => {
        const imageName = "test.jpg";
        const res = await (0, supertest_1.default)(app_1.default)
            .get("/api/resize")
            .query({ image: imageName, width: 150, height: 150 });
        expect(res.status).toBe(200);
        expect(res.body.url).toContain("/generated/");
    });
    it("should list available images", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/api/images");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

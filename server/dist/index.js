"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./routes/api"));
const app_1 = __importDefault(require("./app"));
const cors_1 = __importDefault(require("cors"));
const port = process.env.PORT || 3000;
// Enable CORS
app_1.default.use((0, cors_1.default)());
// Middleware
app_1.default.use(express_1.default.json());
app_1.default.use(express_1.default.urlencoded({ extended: true }));
// Serve static folders
app_1.default.use("/images", express_1.default.static(path_1.default.join(__dirname, "../public/images")));
app_1.default.use("/generated", express_1.default.static(path_1.default.join(__dirname, "../public/generated")));
app_1.default.use(express_1.default.static(path_1.default.join(__dirname, "../../client")));
// Mount routes
app_1.default.use("/api", api_1.default);
// Redirect all unmatched routes
app_1.default.get(/^\/.*$/, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/index.html"));
});
// Start server
app_1.default.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

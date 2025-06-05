"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static folders
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../public/images")));
app.use("/generated", express_1.default.static(path_1.default.join(__dirname, "../public/generated")));
// Mount routes
app.use("/api", api_1.default);
// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

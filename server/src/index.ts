import express, { Application } from "express";
import path from "path";
import apiRoutes from "./routes/api";

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static folders
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/generated", express.static(path.join(__dirname, "../public/generated")));
app.use(express.static(path.join(__dirname, "../../client")));

// Mount routes
app.use("/api", apiRoutes);

// Redirect all unmatched routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/index.html"));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



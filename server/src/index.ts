import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
const app = express();
const port = 3000;
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.get('/api/generate-image', (req: Request, res: Response) => {
    res.status(501).json({ message: 'Image generation endpoint not implemented yet' });
});

app.get('/api/cached-image/:imageName', (req: Request, res: Response) => {
    res.status(501).json({ message: 'Cached image endpoint not implemented yet' });
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

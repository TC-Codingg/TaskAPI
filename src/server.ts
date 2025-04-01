import express from "express";
import { AppDataSource } from "./data-source"; // Database configuration
import taskRoutes from "./routes/taskRoutes"; // Task API routes
import cors from "cors";
import path from "path";

const app = express();

// CORS setup to allow cross-origin requests
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type'] }));

// Middleware for JSON parsing and serving static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the main HTML file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'index.html')));

// Use task-related routes
app.use(taskRoutes);

const PORT = process.env.PORT || 3000;

// Initialize database and start the server
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((error) => console.log(error));
import express from "express";
import { AppDataSource } from "./data-source";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors";
import path from "path";

const app = express();

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use(taskRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
.then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((error) => console.log(error));
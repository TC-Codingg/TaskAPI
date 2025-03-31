import express from "express";
import { AppDataSource } from "./data-source";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors";

const app = express();


const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('src/frontend'));
app.use(taskRoutes);

const PORT = 3000;

AppDataSource.initialize()
.then(() => {
console.log("Database connected successfully");

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
})
.catch((error) => console.log(error));
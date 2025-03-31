import express from "express";
import { AppDataSource } from "./data-source";
import taskRoutes from "./routes/taskRoutes";


const app = express();
app.use(express.json());
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
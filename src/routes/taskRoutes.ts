import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";

const router = Router();
const taskRepository = AppDataSource.getRepository(Task);

router.get("/tasks", async (__dirname, res) => {
    const tasks = await taskRepository.find()
    res.json(tasks)
})

router.post("/tasks", async (req, res) => {
    const {title} = req.body;
    const newTask = taskRepository.create({title})
    await taskRepository.save(newTask)
    res.status(201).json(newTask)
})

router.put("/tasks/:id", async (req, res ): Promise<any> =>{
    const { id } = req.params;
    const {status} = req.body
    const {title} = req.body
    const task = await taskRepository.findOneBy({id: parseInt(id)})

    if(!task) return res.status(404).json({message: "Task not found"})

    task.status = status
    task.title = title
    await taskRepository.save(task)
    return res.json(task)
})

router.delete("/tasks/:id", async (req, res): Promise<any> => {
    const {id} = req.params;
    const task = await taskRepository.findOneBy({id: parseInt(id)})

    if (!task) return res.status(404).json({message: "Task not found"})

    await taskRepository.remove(task)
    res.json({message: "Task deleted"})
})

export default router
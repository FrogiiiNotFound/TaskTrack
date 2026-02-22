import { Router } from "express";
import { taskController } from "../controllers/tasksController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { TaskSchema } from "../ultils/validation/taskValidation";
import { TaskStatusSchema } from "../ultils/validation/taskStatusValidation";

const taskRouter = Router();

taskRouter.use(authMiddleware);

taskRouter.get("/tasks/:taskId", taskController.getTaskById);
taskRouter.put("/tasks/:taskId", validate(TaskSchema), taskController.updateTask);
taskRouter.patch("/tasks/:taskId/status", validate(TaskStatusSchema), taskController.updateTask);
taskRouter.delete("/tasks/:taskId", taskController.deleteTask);

export default taskRouter;

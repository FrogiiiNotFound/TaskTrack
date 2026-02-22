import { Router } from "express";
import { taskGroupController } from "../controllers/taskGroupsController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { TaskGroupSchema } from "../ultils/validation/taskGroupValidation";
import { TaskGroupBannerSchema } from "../ultils/validation/taskGroupBannerValidation";
const taskGroupRouter = Router();

taskGroupRouter.use(authMiddleware);

taskGroupRouter.get("/taskGroups", taskGroupController.getTaskGroups);
taskGroupRouter.get("/taskGroups/:groupId", taskGroupController.getTaskGroupById);
taskGroupRouter.get("/taskGroups/:groupId/tasks", taskGroupController.getTaskGroupsTasks);

taskGroupRouter.post("/taskGroups/:groupId/tasks", taskGroupController.createTask);
taskGroupRouter.post("/taskGroups", validate(TaskGroupSchema), taskGroupController.createTaskGroup);

taskGroupRouter.put(
  "/taskGroups/:groupId",
  validate(TaskGroupSchema),
  taskGroupController.updateTaskGroup,
);

taskGroupRouter.patch(
  "/taskGroups/:groupId/bannerUrl",
  validate(TaskGroupBannerSchema),
  taskGroupController.updateTaskGroupBanner,
);

taskGroupRouter.delete("/taskGroups/:groupId/bannerUrl", taskGroupController.deleteTaskGroup);
taskGroupRouter.delete("/taskGroups/:groupId", taskGroupController.deleteTaskGroup);

export default taskGroupRouter;

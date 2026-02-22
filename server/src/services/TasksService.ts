import { TaskGroupModel } from "../models/TaskGroupModel";
import { TaskModel } from "../models/TaskModel";
import ApiError from "../ultils/exeptions/ApiError";
import type { Task } from "../ultils/validation/taskValidation";

class TasksService {
  async getTaskById(taskId: string, userId: string) {
    const task = TaskModel.findOne({ _id: taskId, userId }).populate("taskGroup");
    if (!task) throw ApiError.NotFound("Задача не найдена");

    return task;
  }

  async createTask(taskData: Task, userId: string, groupId: string) {
    const group = await TaskGroupModel.findOne({ _id: groupId, userId });
    if (!group) throw ApiError.NotFound("Группа задач не найдена");

    const task = await TaskModel.create({
      ...taskData,
      user_id: userId,
    });

    return task;
  }

  async updateTask(taskDto: Task, taskId: string, userId: string) {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, user_id: userId },
      { $set: taskDto },
      { new: true, runValidators: true },
    );
    if (!updatedTask) throw ApiError.NotFound("Задача не найдена");

    return updatedTask;
  }

  async updateTaskState(status: string, taskId: string, userId: string) {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, user_id: userId },
      { $set: { status } },
      { new: true, runValidators: true },
    );
    if (!updatedTask) throw ApiError.NotFound("Задача не найдена");

    return updatedTask;
  }

  async deleteTask(taskId: string, userId: string) {
    const task = await TaskModel.findOneAndDelete({ _id: taskId, userId });
    if (!task) throw ApiError.BadRequest("Задача не найдена");

    return task;
  }
}

export default new TasksService();

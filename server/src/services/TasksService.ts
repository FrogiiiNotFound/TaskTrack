import { TaskGroupModel } from '../models/TaskGroupModel';
import { TaskModel } from '../models/TaskModel';
import ApiError from '../ultils/exeptions/ApiError';
import type { Task } from '../ultils/validation/taskValidation';
import type { UpdateTask } from '../ultils/validation/updateTaskValidation';

class TasksService {
  async getTaskById(taskId: string, userId: string) {
    const task = TaskModel.findOne({ _id: taskId, userId }).populate('taskGroup');
    if (!task) throw ApiError.NotFound('Задача не найдена');

    return task;
  }

  async createTask(taskData: Task, userId: string) {
    const group = await TaskGroupModel.findOne({ _id: taskData.taskGroupId, user: userId });
    if (!group) throw ApiError.NotFound('Группа задач не найдена');

    const task = await TaskModel.create({
      ...taskData,
      userId,
    });

    return task;
  }

  async updateTask(taskDto: UpdateTask, taskId: string, userId: string) {
    if (taskDto.taskGroupId) {
      const group = await TaskGroupModel.findOne({ _id: taskDto.taskGroupId, user: userId });
      if (!group) throw ApiError.NotFound('Группа задач не найдена');
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, user: userId },
      { $set: taskDto },
      { new: true, runValidators: true },
    );
    if (!updatedTask) throw ApiError.NotFound('Задача не найдена');

    return updatedTask;
  }

  async deleteTask(taskId: string, userId: string) {
    const task = await TaskModel.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) throw ApiError.BadRequest('Задача не найдена');

    return task;
  }
}

export default new TasksService();

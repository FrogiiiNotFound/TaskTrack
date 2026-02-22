import { Types } from "mongoose";
import { TaskGroupModel } from "../models/TaskGroupModel";
import { TaskModel } from "../models/TaskModel";
import ApiError from "../ultils/exeptions/ApiError";
import type { TaskGroup } from "../ultils/validation/taskGroupValidation";

class TaskGroupsService {
  async getTaskGroups(userId: string) {
    const groups = await TaskGroupModel.find({ userId }).sort({ title: 1 }).lean();

    return groups;
  }
  async getTaskGroupById(groupId: string, userId: string) {
    const group = await TaskGroupModel.findOne({ _id: groupId, userId });

    return group;
  }
  async getTaskGroupTasks(groupId: string, userId: string) {
    const tasks = await TaskModel.find({ groupId, userId }).sort({ createdAt: -1 });

    return tasks;
  }

  async createTaskGroup(groupData: TaskGroup, userId: string) {
    if (!groupData.name) throw ApiError.BadRequest("Имя обязательно");

    const candidate = await TaskGroupModel.findOne({ name: groupData.name, userId });
    if (candidate) throw ApiError.BadRequest("Группа с таким именем уже существует");

    const group = await TaskGroupModel.create({
      ...groupData,
      user_id: new Types.ObjectId(userId),
    });

    return group;
  }
  async updateTaskGroup(id: string, userId: string, dto: TaskGroup) {
    if (dto.name) {
      const candidate = await TaskGroupModel.findOne({
        name: dto.name,
        user: userId,
        _id: { $ne: id },
      });
      if (candidate) throw ApiError.BadRequest("Группа с таким именем уже существует");
    }

    const updatedGroup = await TaskGroupModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: dto },
      { new: true, runValidators: true },
    );
    if (!updatedGroup) throw ApiError.NotFound("Группа не найдена");
  }

  async updateTaskGroupBanner(taskGroupId: string, userId: string, bannerUrl: string) {
    const updatedGroup = await TaskGroupModel.findOneAndUpdate(
      { _id: taskGroupId, user_id: userId },
      { banner_url: bannerUrl },
      { new: true, runValidators: true },
    );

    return updatedGroup;
  }

  async deleteTaskGroupBanner(id: string, userId: string) {
    const updatedGroup = await TaskGroupModel.findOneAndUpdate(
      { _id: id, userId },
      { banner_url: "" },
      { new: true, runValidators: true },
    );

    return updatedGroup;
  }

  async deleteTaskGroup(id: string, userId: string) {
    const group = await TaskGroupModel.findOne({ _id: id, userId });
    if (!group) throw ApiError.NotFound("Группа не найдена");

    await TaskModel.deleteMany({ taskGroupId: id, userId });

    const deletedGroup = await TaskGroupModel.deleteOne({ _id: id, userId });

    return deletedGroup;
  }
}

export default new TaskGroupsService();

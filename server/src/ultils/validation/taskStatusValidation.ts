import z from "zod";

export const TaskStatusSchema = z.object({
  status: z.enum(["inProgress", "marked", "done"]),
});

export type Task = z.infer<typeof TaskStatusSchema>;

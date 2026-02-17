import z from 'zod';

export const UpdateTaskSchema = z.object({
  name: z.string().nonempty('Название не может быть пустым').optional(),
  text: z.string().optional(),
  status: z.enum(['inProgress', 'marked', 'done']).optional(),
  taskGroupId: z.string().optional(),
});

export type UpdateTask = z.infer<typeof UpdateTaskSchema>;

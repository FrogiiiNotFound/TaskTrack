import z from 'zod';

export const TaskSchema = z.object({
  name: z.string().nonempty('Название не может быть пустым'),
  text: z.string(),
  status: z.enum(['inProgress', 'marked', 'done']),
  taskGroupId: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;

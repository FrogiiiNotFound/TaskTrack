import z from 'zod';

export const TaskSchema = z.object({
  name: z.string().nonempty('Название не может быть пустым'),
  text: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;

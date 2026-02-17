import z from 'zod';

export const UpdateTaskGroupSchema = z.object({
  name: z.string().nonempty('Имя группы не может быть пустым').optional(),
  bannerUrl: z.string().pipe(z.url('Неправильный URL')).optional(),
  color: z
    .enum(['#880d1e', '#606c38', '#f26a8d', '#7f5539', '#0077b6', '#5a189a', '#fdf0d5'])
    .optional(),
});

export type UpdateTaskGroup = z.infer<typeof UpdateTaskGroupSchema>;

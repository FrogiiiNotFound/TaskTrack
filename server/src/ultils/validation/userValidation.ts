import z from 'zod';

export const UserSchema = z.object({
  user_id: z.string(),
  email: z.string().trim().toLowerCase().pipe(z.email('Неккоректная почта')),
  nickname: z.string().optional(),
  is_activated: z.boolean(),
  avatar_url: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

import z from 'zod';

export const UserSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email('Неккоректная почта')),
  nickname: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

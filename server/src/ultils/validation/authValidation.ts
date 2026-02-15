import z from 'zod';

export const AuthSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email('Неккоректная почта')),
  password: z
    .string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .max(20, 'Пароль должен быть не более 20 символов'),
});

export type Auth = z.infer<typeof AuthSchema>;

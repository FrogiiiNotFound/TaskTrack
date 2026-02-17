import z from 'zod';

export const EventSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  created_at: z.string(),
  end_date: z.string(),
  user_id: z.string(),
});

export type Event = z.infer<typeof EventSchema>;

import z from 'zod';

export const EventSchema = z.object({
  name: z.string().min(1).max(60),
  description: z.string().optional(),
  end_date: z.string(),
});

export type Event = z.infer<typeof EventSchema>;

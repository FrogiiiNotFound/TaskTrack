import z from "zod";

export const TaskGroupBannerSchema = z.object({
  bannerUrl: z.string(),
});

export type TaskGroupBanner = z.infer<typeof TaskGroupBannerSchema>;

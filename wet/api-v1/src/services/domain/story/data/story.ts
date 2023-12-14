import type { StoryReaction } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const typesafeStory = Prisma.validator<Prisma.StoryDefaultArgs>()({
  include: {
    ChapterStory: true,
    StoryReaction: true,
    StoryUser: true,
  },
});

export type DBStory = Prisma.StoryGetPayload<typeof typesafeStory>;

export type DBStoryReaction = StoryReaction

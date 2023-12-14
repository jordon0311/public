import { Prisma } from "@prisma/client";

export const typesafeChapter = Prisma.validator<Prisma.ChapterDefaultArgs>()({
  include: {
    ChapterStory: true,
  },
});

export type DBChapter = Prisma.ChapterGetPayload<typeof typesafeChapter>;

import type { params } from "domain/chapter/api.params";
import type { DBChapter } from "domain/chapter/data/chapter";
import { typesafeChapter } from "domain/chapter/data/chapter";

import { wetDBClient } from "#lib/wetDBClient";

export const queries = {
  getChapter: async (params: params.GetChapter): Promise<DBChapter | null> => {
    const chapter = await wetDBClient.chapter.findUnique({
      where: { id: params.id },
      ...typesafeChapter,
    });
    return chapter;
  },
  searchChapters: async (
    params: params.SearchChapters,
  ): Promise<DBChapter[]> => {
    const chapters = await wetDBClient.chapter.findMany({
      where: {
        ...params.storyId && { ChapterStory: { storyId: params.storyId } },
      },
      ...typesafeChapter,
    });
    return chapters;
  },
};

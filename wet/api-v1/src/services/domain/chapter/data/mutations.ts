/* eslint-disable @typescript-eslint/naming-convention */

import type { params } from "domain/chapter/api.params";
import type { DBChapter } from "domain/chapter/data/chapter";
import { typesafeChapter } from "domain/chapter/data/chapter";

import type { BatchCount } from "#common/types/batchCount";
import { wetDBClient } from "#lib/wetDBClient";

export const mutations = {
  createChapter: async ({
    index,
    storyId,
    content,
    title,
  }: params.CreateChapter): Promise<DBChapter> => {
    const chapter = await wetDBClient.chapter.create({
      data: {
        ChapterStory: {
          create: { chapterIndex: index, storyId },
        },
        content,
        title,
      },
      ...typesafeChapter,
    });
    return chapter;
  },
  deleteChapter: async ({ id }: params.DeleteChapter): Promise<DBChapter> => {
    const chapter = await wetDBClient.chapter.delete({
      where: { id },
      ...typesafeChapter,
    });
    return chapter;
  },
  deleteChapters: async ({ ids }: { ids: string[] }): Promise<BatchCount> => {
    const response = await wetDBClient.chapter.deleteMany({
      where: { id: { in: ids } },
    });
    return response;
  },
  deleteChaptersByStoryId: async ({
    storyId,
  }: {
    storyId: string;
  }): Promise<BatchCount> => {
    const response = await wetDBClient.chapter.deleteMany({
      where: { ChapterStory: { storyId } },
    });
    return response;
  },
  updateChapter: async ({
    id,
    index,
    content,
    title,
  }: params.UpdateChapter): Promise<DBChapter> => {
    const chapter = await wetDBClient.chapter.update({
      data: {
        content,
        title,
        ...index && {
          ChapterStory: { update: { chapterIndex: index } },
        },
      },
      where: { id },
      ...typesafeChapter,
    });
    return chapter;
  },
};

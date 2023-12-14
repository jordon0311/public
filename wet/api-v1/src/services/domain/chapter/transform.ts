import type { DBChapter } from "domain/chapter/data/chapter";
import type { Chapter } from "domain/chapter/models/chapter";

import { assertValue } from "#util/assertValue";

export const transform = {
  chapter: (source: DBChapter): Chapter => {
    const chapterStory = assertValue("ChapterStory", source.ChapterStory);
    return {
      content: source.content,
      id: source.id,
      index: chapterStory.chapterIndex,
      storyId: chapterStory.storyId,
      title: source.title,
    };
  },
};

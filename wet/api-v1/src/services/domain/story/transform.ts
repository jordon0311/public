import type { DBStory, DBStoryReaction } from "domain/story/data/story";
import type { Story } from "domain/story/models/story";
import type { StoryReaction } from "domain/story/models/storyReaction";

import { dbToDomain } from "#common/types/transforms/dbToDomain";
import { assertValue } from "#util/assertValue";

export const transform = {
  story: (source: DBStory): Story => {
    const storyUser = assertValue("storyUser", source.StoryUser);
    const chapters = source.ChapterStory.map((v) => v.chapterId);
    const reactions = source.StoryReaction.map(dbToStoryReaction);
    return {
      authorUserId: storyUser.userId,
      chapters,
      id: source.id,
      reactions,
      title: source.title,
    };
  },
};

const dbToStoryReaction = (source: DBStoryReaction): StoryReaction => {
  return { opinion: dbToDomain.opinion(source.opinion), userId: source.userId };
};

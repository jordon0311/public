import type { params } from "domain/story/api.params";
import type { DBStory } from "domain/story/data/story";
import { typesafeStory } from "domain/story/data/story";

import { wetDBClient } from "#lib/wetDBClient";

export const queries = {
  getStory: async (params: params.GetStory): Promise<DBStory | null> => {
    const story = await wetDBClient.story.findUnique({
      where: { id: params.id },
      ...typesafeStory,
    });
    return story;
  },
  searchStories: async (params: params.SearchStories): Promise<DBStory[]> => {
    /** TODO: Pagination */
    console.log(params);
    const stories = await wetDBClient.story.findMany({
      where: {},
      ...typesafeStory,
    });
    return stories;
  },
};

/* eslint-disable @typescript-eslint/naming-convention */
import type { params } from "domain/story/api.params";
import { type DBStory, typesafeStory } from "domain/story/data/story";

import { domainToDb } from "#common/types/transforms/domainToDb";
import { wetDBClient } from "#lib/wetDBClient";

export const mutations = {
  createStory: async (params: params.CreateStory): Promise<DBStory> => {
    const story = await wetDBClient.story.create({
      data: {
        StoryUser: { create: { userId: params.authorUserId } },
        title: params.title,
      },
      ...typesafeStory,
    });
    return story;
  },
  deleteStory: async (params: params.DeleteStory): Promise<DBStory> => {
    const story = await wetDBClient.story.delete({
      where: { id: params.id },
      ...typesafeStory,
    });
    return story;
  },
  updateStory: async (params: params.UpdateStory): Promise<DBStory> => {
    const story = await wetDBClient.story.update({
      data: { title: params.title },
      where: { id: params.id },
      ...typesafeStory,
    });
    return story;
  },
  upsertStoryReaction: async (
    params: params.ReactToStory,
  ): Promise<DBStory> => {
    const storyReaction = await wetDBClient.story.update({
      data: {
        StoryReaction: {
          upsert: {
            create: {
              opinion: domainToDb.opinion(params.opinion),
              userId: params.userId,
            },
            update: {
              opinion: domainToDb.opinion(params.opinion),
            },
            where: {
              storyId_userId: {
                storyId: params.storyId,
                userId: params.userId,
              },
            },
          },
        },
      },
      where: { id: params.storyId },
      ...typesafeStory,
    });
    return storyReaction;
  },
};

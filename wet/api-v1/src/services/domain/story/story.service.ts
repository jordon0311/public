import { Injectable } from "@nestjs/common";
import { mutations } from "domain/story/data/mutations";
import { queries } from "domain/story/data/queries";
import { transform } from "domain/story/transform";

import { NotFoundError } from "#common/errors/NotFoundError";
import type { StoryApi } from "#services/domain/story/api.interface";
import type { params } from "#services/domain/Story/api.params";
import type { Story } from "#services/domain/story/models/story";

@Injectable()
export class StoryService implements StoryApi {
  /** Create a story */
  CreateStory: (params: params.CreateStory) => Promise<Story> = async (
    params,
  ) => {
    const dbStory = await mutations.createStory(params);
    const story = transform.story(dbStory);
    return story;
  };
  /** Delete a story */
  DeleteStory: (params: params.DeleteStory) => Promise<Story> = async (
    params,
  ) => {
    const dbStory = await mutations.deleteStory(params);
    const story = transform.story(dbStory);
    return story;
  };
  /** Get a story */
  GetStory: (params: params.GetStory) => Promise<Story> = async (params) => {
    const dbStory = await queries.getStory(params);
    if (!dbStory) {
      throw new NotFoundError({ message: "Story not found" });
    }
    const story = transform.story(dbStory);
    return story;
  };
  /** Create or update a story reaction */
  ReactToStory: (params: params.ReactToStory) => Promise<Story> = async (
    params,
  ) => {
    const dbStory = await mutations.upsertStoryReaction(params);
    const story = transform.story(dbStory);
    return story;
  };
  /** Search stories */
  SearchStories: (params: params.SearchStories) => Promise<Story[]> = async (
    params,
  ) => {
    const dbStories = await queries.searchStories(params);
    const stories = dbStories.map(transform.story);
    return stories;
  };
  /** Update a story */
  UpdateStory: (params: params.UpdateStory) => Promise<Story> = async (
    params,
  ) => {
    const dbStory = await mutations.updateStory(params);
    const story = transform.story(dbStory);
    return story;
  };
}

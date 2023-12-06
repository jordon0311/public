import type { params } from "domain/Story/api.params";

import type { Story } from "#services/domain/story/models/story";

export interface StoryApi {
  CreateStory: (params: params.CreateStory) => Promise<Story>;
  DeleteStory: (params: params.DeleteStory) => Promise<Story>;
  GetStory: (params: params.GetStory) => Promise<Story>;
  ReactToStory: (params: params.ReactToStory) => Promise<Story>;
  SearchStories: (params: params.SearchStories) => Promise<Story[]>;
  UpdateStory: (params: params.UpdateStory) => Promise<Story>;
}

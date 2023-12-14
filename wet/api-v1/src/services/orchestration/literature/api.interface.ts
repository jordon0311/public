import type { Chapter } from "domain/chapter/models/chapter";
import type { Story } from "domain/story/models/story";
import type { params } from "orchestration/literature/api.params";
import type { OrchestratedStory } from "orchestration/literature/models/orchestratedStory";

export interface LiteratureApi {
  CreateChapter: (params: params.CreateChapter) => Promise<Chapter>;
  CreateStory: (params: params.CreateStory) => Promise<OrchestratedStory>;
  DeleteChapter: (params: params.DeleteChapter) => Promise<void>;
  DeleteStory: (params: params.DeleteStory) => Promise<void>;
  GetChapter: (params: params.GetChapter) => Promise<Chapter>;
  GetStory: (params: params.GetStory) => Promise<OrchestratedStory>;
  ReactToStory: (params: params.ReactToStory) => Promise<OrchestratedStory>;
  SearchStories: (params: params.SearchStories) => Promise<Story[]>;
  UpdateChapter: (params: params.UpdateChapter) => Promise<Chapter>;
  UpdateStory: (params: params.UpdateStory) => Promise<OrchestratedStory>;
}

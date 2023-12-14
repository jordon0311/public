import { Injectable } from "@nestjs/common";
import { ChapterService } from "domain/chapter/chapter.service";
import type { Chapter } from "domain/chapter/models/chapter";
import type { Story } from "domain/story/models/story";
import { StoryService } from "domain/story/story.service";
import type { LiteratureApi } from "orchestration/literature/api.interface";
import type { params } from "orchestration/literature/api.params";
import type { OrchestratedStory } from "orchestration/literature/models/orchestratedStory";
import { transform } from "orchestration/literature/transform";

@Injectable()
export class LiteratureService implements LiteratureApi {
  constructor(
    private readonly chapterService: ChapterService,
    private readonly storyService: StoryService,
  ) {}
  /** Create a chapter */
  CreateChapter: (params: params.CreateChapter) => Promise<Chapter> = async (params) => {
    const chapter = await this.chapterService.CreateChapter(params);
    return chapter;
  };
  /** Create a story */
  CreateStory: (params: params.CreateStory) => Promise<OrchestratedStory> = async (
    params,
  ) => {
    const story = await this.storyService.CreateStory(params);
    return transform.orchestratedStory(story, []);
  };
  /** Delete a chapter */
  DeleteChapter: (params: params.DeleteChapter) => Promise<void> = async (params) => {
    await this.chapterService.DeleteChapter(params);
    return;
  };
  /** Delete a story*/
  DeleteStory: (params: params.DeleteStory) => Promise<void> = async (params) => {
    await this.chapterService.DeleteChapters({
      discriminator: "storyId",
      storyId: params.id,
    });
    await this.storyService.DeleteStory(params);
    return;
  };
  /** Get a chapter */
  GetChapter: (params: params.GetChapter) => Promise<Chapter> = async (params) => {
    const chapter = await this.chapterService.GetChapter(params);
    return chapter;
  };
  /** Get a story */
  GetStory: (params: params.GetStory) => Promise<OrchestratedStory> = async (params) => {
    const story = await this.storyService.GetStory(params);
    const chapters = await this.chapterService.SearchChapters({
      storyId: params.id,
    });
    return transform.orchestratedStory(story, chapters);
  };
  /** Create or update a story reaction */
  ReactToStory: (params: params.ReactToStory) => Promise<OrchestratedStory> = async (
    params,
  ) => {
    const story = await this.storyService.ReactToStory(params);
    const chapters = await this.chapterService.SearchChapters({
      storyId: params.storyId,
    });
    return transform.orchestratedStory(story, chapters);
  };
  /** Search stories */
  SearchStories: (params: params.SearchStories) => Promise<Story[]> = async (params) => {
    const stories = await this.storyService.SearchStories(params);
    return stories;
  };
  /** Update a chapter */
  UpdateChapter: (params: params.UpdateChapter) => Promise<Chapter> = async (params) => {
    const chapter = await this.chapterService.UpdateChapter(params);
    return chapter;
  };
  /** Update a story */
  UpdateStory: (params: params.UpdateStory) => Promise<OrchestratedStory> = async (
    params,
  ) => {
    const story = await this.storyService.UpdateStory(params);
    const chapters = await this.chapterService.SearchChapters({
      storyId: params.id,
    });
    return transform.orchestratedStory(story, chapters);
  };
}

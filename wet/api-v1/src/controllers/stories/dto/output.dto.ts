import type { Chapter } from "domain/chapter/models/chapter";
import type { Story } from "domain/story/models/story";
import type { StoryReaction } from "domain/story/models/storyReaction";
import type { OrchestratedStory } from "orchestration/literature/models/orchestratedStory";

import type { Opinion } from "#common/types/enums/opinion";

export class ChapterOutputDto {
  content: string;
  id: string;
  index: number;
  storyId: string;
  title: string;

  constructor(source: Chapter) {
    this.content = source.content;
    this.id = source.id;
    this.index = source.index;
    this.storyId = source.storyId;
    this.title = source.title;
  }
}

export class StoryReactionOutputDto {
  opinion: Opinion;

  constructor(source: StoryReaction) {
    this.opinion = source.opinion;
  }
}

export class StoryOutputDto {
  authorUserId: string;
  chapters: ChapterOutputDto[];
  id: string;
  reactions: StoryReactionOutputDto[];
  title: string;

  constructor(source: OrchestratedStory) {
    this.authorUserId = source.authorUserId;
    this.chapters = source.chapters.map(
      (chapter) => new ChapterOutputDto(chapter),
    );
    this.id = source.id;
    this.reactions = source.reactions.map(
      (reaction) => new StoryReactionOutputDto(reaction),
    );
    this.title = source.title;
  }
}

export class StoryListItemOutputDto {
  authorUserId: string;
  chapterIds: string[];
  id: string;
  reactions: StoryReactionOutputDto[];
  title: string;

  constructor(source: Story) {
    this.authorUserId = source.authorUserId;
    this.chapterIds = source.chapters;
    this.id = source.id;
    this.reactions = source.reactions.map(
      (reaction) => new StoryReactionOutputDto(reaction),
    );
    this.title = source.title;
  }
}

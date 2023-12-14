import type { Chapter } from "domain/chapter/models/chapter";
import type { StoryReaction } from "domain/story/models/storyReaction";

export type OrchestratedStory = {
  authorUserId: string;
  chapters: Chapter[];
  id: string;
  reactions: StoryReaction[];
  title: string;
};

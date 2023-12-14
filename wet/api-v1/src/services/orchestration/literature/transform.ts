import type { Chapter } from "domain/chapter/models/chapter";
import type { Story } from "domain/story/models/story";
import type { OrchestratedStory } from "orchestration/literature/models/orchestratedStory";

export const transform = {
  orchestratedStory: (story: Story, chapters: Chapter[]): OrchestratedStory => {
    return {
      ...story,
      chapters,
    };
  },
};

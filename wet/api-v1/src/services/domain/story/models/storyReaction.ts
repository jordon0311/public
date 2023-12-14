import type { Opinion } from "#common/types/enums/opinion";

export type StoryReaction = {
  opinion: Opinion;
  userId: string;
}

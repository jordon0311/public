import type { Opinion } from "#common/types/enums/opinion";

export namespace params {
  export type CreateStory = {
    authorUserId: string;
    title: string;
  };

  export type DeleteStory = {
    id: string;
  };

  export type GetStory = { id: string };

  export type ReactToStory = {
    opinion: Opinion;
    storyId: string;
    userId: string;
  };

  export type SearchStories = {
    limit?: number;
    page?: number;
  };

  export type UpdateStory = {
    id: string;
    title?: string;
  };
}

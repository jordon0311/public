export namespace params {
  export type CreateChapter = {
    content: string;
    index: number;
    storyId: string;
    title: string;
  };

  export type DeleteChapter = {
    id: string;
  };

  export type DeleteChapters = DeleteChaptersByIds | DeleteChaptersByStory;

  export type GetChapter = { id: string };

  export type SearchChapters = {
    limit?: number;
    page?: number;
    storyId?: string;
  };

  export type UpdateChapter = {
    content?: string;
    id: string;
    index?: number;
    title?: string;
  };
}

type DeleteChaptersByStory = {
  discriminator: "storyId";
  storyId: string;
};

type DeleteChaptersByIds = {
  discriminator: "ids";
  ids: string[];
};

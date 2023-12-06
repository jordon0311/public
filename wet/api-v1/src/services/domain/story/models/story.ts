import type { Opinion } from "#common/types/enums/opinion";

type Reaction = {
  opinion: Opinion;
  userId: string;
};
export type Story = {
  authorUserId: string;
  chapters: string[];
  id: string;
  reactions: Reaction[];
  title: string;
};

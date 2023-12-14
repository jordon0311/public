import type { BatchCount } from "#common/types/batchCount";
import type { params } from "#services/domain/chapter/api.params";
import type { Chapter } from "#services/domain/chapter/models/chapter";

export interface ChapterApi {
  CreateChapter: (params: params.CreateChapter) => Promise<Chapter>;
  DeleteChapter: (params: params.DeleteChapter) => Promise<Chapter>;
  DeleteChapters: (params: params.DeleteChapters) => Promise<BatchCount>;
  GetChapter: (params: params.GetChapter) => Promise<Chapter>;
  SearchChapters: (params: params.SearchChapters) => Promise<Chapter[]>;
  UpdateChapter: (params: params.UpdateChapter) => Promise<Chapter>;
}

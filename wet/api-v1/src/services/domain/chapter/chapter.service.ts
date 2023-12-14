import { Injectable } from "@nestjs/common";
import { mutations } from "domain/chapter/data/mutations";
import { queries } from "domain/chapter/data/queries";
import { transform } from "domain/chapter/transform";

import { NotFoundError } from "#common/errors/NotFoundError";
import type { BatchCount } from "#common/types/batchCount";
import type { ChapterApi } from "#services/domain/chapter/api.interface";
import type { params } from "#services/domain/chapter/api.params";
import type { Chapter } from "#services/domain/chapter/models/chapter";

@Injectable()
export class ChapterService implements ChapterApi {
  /** Create a chapter */
  CreateChapter: (params: params.CreateChapter) => Promise<Chapter> = async (
    params,
  ) => {
    const dbChapter = await mutations.createChapter(params);
    const chapter = transform.chapter(dbChapter);
    return chapter;
  };
  /** Delete a chapter */
  DeleteChapter: (params: params.DeleteChapter) => Promise<Chapter> = async (
    params,
  ) => {
    const dbChapter = await mutations.deleteChapter(params);
    const chapter = transform.chapter(dbChapter);
    return chapter;
  };
  /** Delete multiple chapters */
  DeleteChapters: (params: params.DeleteChapters) => Promise<BatchCount> =
    async (params) => {
      const response = await (async () => {
        switch (params.discriminator) {
          case "ids":
            return mutations.deleteChapters(params);
          case "storyId":
            return mutations.deleteChaptersByStoryId(params);
        }
      })();
      return response;
    };
  /** Get a chapter */
  GetChapter: (params: params.GetChapter) => Promise<Chapter> = async (
    params,
  ) => {
    const dbChapter = await queries.getChapter(params);
    if (!dbChapter) {
      throw new NotFoundError({ message: "Chapter not found" });
    }
    const chapter = transform.chapter(dbChapter);
    return chapter;
  };
  /** Get multiple chapters */
  SearchChapters: (params: params.SearchChapters) => Promise<Chapter[]> =
    async (params) => {
      const dbChapters = await queries.searchChapters(params);
      const chapters = dbChapters.map(transform.chapter);
      return chapters;
    };
  /** Update a chapter */
  UpdateChapter: (params: params.UpdateChapter) => Promise<Chapter> = async (
    params,
  ) => {
    const dbChapter = await mutations.updateChapter(params);
    const chapter = transform.chapter(dbChapter);
    return chapter;
  };
}

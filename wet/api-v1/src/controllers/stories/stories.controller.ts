import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LiteratureService } from "orchestration/literature/service";

import { ResponseStatus } from "#common/types/enums/responseStatus";
import {
  ChapterOutputDto,
  StoryListItemOutputDto,
} from "#controllers/stories/dto/output.dto";
import { StoryOutputDto } from "#controllers/stories/dto/output.dto";
import { ApiResponse } from "#controllers/types/response.dto";

import * as InputDto from "./dto/input.dto";

@ApiTags("stories")
@Controller("stories")
export class StoriesController {
  constructor(private readonly service: LiteratureService) {}

  @Post("chapter")
  async CreateChapter(
    @Body() inputDto: InputDto.CreateChapter,
  ): ApiResponse<ChapterOutputDto> {
    const chapter = await this.service.CreateChapter({
      content: inputDto.content,
      index: inputDto.index,
      storyId: inputDto.storyId,
      title: inputDto.title,
    });
    const dto = new ChapterOutputDto(chapter);
    return { data: dto };
  }

  @Post()
  async CreateStory(
    @Headers("userId") userId: string,
    @Body() inputDto: InputDto.CreateStory,
  ): ApiResponse<StoryOutputDto> {
    const story = await this.service.CreateStory({
      authorUserId: userId,
      title: inputDto.title,
    });
    const dto = new StoryOutputDto(story);
    return { data: dto };
  }

  @Delete("/chapter/:chapterId")
  async DeleteChapter(
    @Param("chapterId") chapterId: string,
  ): ApiResponse<ResponseStatus> {
    await this.service.DeleteChapter({ id: chapterId });
    return { data: ResponseStatus.SUCCESS };
  }

  @Delete(":storyId")
  async DeleteStory(
    @Param("storyId") storyId: string,
  ): ApiResponse<ResponseStatus> {
    await this.service.DeleteStory({ id: storyId });
    return { data: ResponseStatus.SUCCESS };
  }

  @Get("/chapter/:chapterId")
  async GetChapter(
    @Param("chapterId") chapterId: string,
  ): ApiResponse<ChapterOutputDto> {
    const chapter = await this.service.GetChapter({ id: chapterId });
    const dto = new ChapterOutputDto(chapter);
    return { data: dto };
  }

  @Get(":storyId")
  async GetStory(
    @Param("storyId") storyId: string,
  ): ApiResponse<StoryOutputDto> {
    const story = await this.service.GetStory({ id: storyId });
    const dto = new StoryOutputDto(story);
    return { data: dto };
  }

  @Put(":storyId/react")
  async ReactToStory(
    @Headers("userId") userId: string,
    @Param("storyId") storyId: string,
    @Body() inputDto: InputDto.ReactToStory,
  ): ApiResponse<StoryOutputDto> {
    const story = await this.service.ReactToStory({
      opinion: inputDto.opinion,
      storyId,
      userId,
    });
    const dto = new StoryOutputDto(story);
    return { data: dto };
  }

  @Get()
  async SearchStories(
    @Query("page") page?: number,
    @Query("limit") limit?: number,
  ): ApiResponse<StoryListItemOutputDto[]> {
    const stories = await this.service.SearchStories({
      limit,
      page,
    });
    const dto = stories.map((story) => new StoryListItemOutputDto(story));
    return { data: dto };
  }

  @Put("/chapter/:chapterId")
  async UpdateChapter(
    @Param("chapterId") chapterId: string,
    @Body() inputDto: InputDto.UpdateChapter,
  ): ApiResponse<ChapterOutputDto> {
    const chapter = await this.service.UpdateChapter({
      content: inputDto.content,
      id: chapterId,
      index: inputDto.index,
      title: inputDto.title,
    });
    const dto = new ChapterOutputDto(chapter);
    return { data: dto };
  }

  @Put(":storyId")
  async UpdateStory(
    @Param("storyId") storyId: string,
    @Body() inputDto: InputDto.UpdateStory,
  ): ApiResponse<StoryOutputDto> {
    const story = await this.service.UpdateStory({
      id: storyId,
      title: inputDto.title,
    });
    const dto = new StoryOutputDto(story);
    return { data: dto };
  }
}

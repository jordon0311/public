import {
  IsApiEnum,
  IsApiInteger,
  IsApiLimit,
  IsApiPage,
  IsApiString,
} from "src/common/decorators/validation";

import { Opinion } from "#common/types/enums/opinion";

export class CreateChapter {
  @IsApiString()
    content!: string;
  @IsApiInteger()
    index!: number;
  @IsApiString()
    storyId!: string;
  @IsApiString()
    title!: string;
}

export class CreateStory {
  @IsApiString()
    title!: string;
}

export class ReactToStory {
  @IsApiEnum({ enum: Opinion })
    opinion!: Opinion;
}

export class SearchStories {
  @IsApiLimit({ optional: true })
    limit?: number;
  @IsApiPage({ optional: true })
    page?: number;
}

export class UpdateChapter {
  @IsApiString({ optional: true })
    content?: string;
  @IsApiInteger({ optional: true })
    index?: number;
  @IsApiString({ optional: true })
    title?: string;
}

export class UpdateStory {
  @IsApiString({ optional: true })
    title?: string;
}

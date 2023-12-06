import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "src/services/domain/user/user.service";

import { ApiResponse } from "#controllers/types/response.dto";

import * as InputDto from "./dto/input.dto";
import { UserOutputDto } from "./dto/output.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async CreateUser(
    @Body() inputDto: InputDto.CreateUser,
  ): ApiResponse<UserOutputDto> {
    const user = await this.userService.CreateUser(inputDto);
    const dto = new UserOutputDto(user);
    return { data: dto };
  }

  @Delete(":userId")
  async Delete(@Param("userId") userId: string): ApiResponse<UserOutputDto> {
    const user = await this.userService.DeleteUser({ id: userId });
    const dto = new UserOutputDto(user);
    return { data: dto };
  }

  @Get(":userId")
  async GetUser(@Param("userId") userId: string): ApiResponse<UserOutputDto> {
    const user = await this.userService.GetUser({
      discriminator: "id",
      id: userId,
    });
    const dto = new UserOutputDto(user);
    return { data: dto };
  }

  @Get()
  async GetUsers(): ApiResponse<UserOutputDto[]> {
    const users = await this.userService.SearchUsers({});
    const dto = users.map((user) => new UserOutputDto(user));
    return { data: dto };
  }

  @Put(":userId")
  async Update(
    @Param("userId") userId: string,
    @Body() inputDto: InputDto.UpdateUser,
  ): ApiResponse<UserOutputDto> {
    const user = await this.userService.UpdateUser({ id: userId, ...inputDto });
    const dto = new UserOutputDto(user);
    return { data: dto };
  }
}

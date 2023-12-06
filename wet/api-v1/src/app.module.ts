import { Module } from "@nestjs/common";

import { AppController } from "./controllers/app.controller";
import { StoriesController } from "./controllers/stories/stories.controller";
import { UsersController } from "./controllers/users/users.controller";
import { AppService } from "./services/app.service";
import { UserService } from "./services/user/user.service";

@Module({
  controllers: [AppController, UsersController, StoriesController],
  imports: [],
  providers: [AppService, UserService],
})
export class AppModule {}

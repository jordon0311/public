import { Injectable } from "@nestjs/common";
import { mutations } from "domain/user/data/mutations";
import { queries } from "domain/user/data/queries";
import { transform } from "domain/user/transform";
import { NotFoundError } from "src/common/errors/NotFoundError";
import type { UserApi } from "src/services/domain/user/api.interface";
import type { params } from "src/services/domain/user/api.params";
import type { User } from "src/services/domain/user/models/user";

@Injectable()
export class UserService implements UserApi {
  CreateUser: (params: params.CreateUser) => Promise<User> = async (params) => {
    const dbUser = await mutations.createUser(params);
    const user = transform.user(dbUser);
    return user;
  };
  DeleteUser: (params: params.DeleteUser) => Promise<User> = async (params) => {
    const dbUser = await mutations.deleteUser(params);
    const user = transform.user(dbUser);
    return user;
  };
  GetUser: (params: params.GetUser) => Promise<User> = async (params) => {
    const dbUser = await (async () => {
      switch (params.discriminator) {
        case "email":
          return queries.getUserByEmail(params.email);
        case "id":
          return queries.getUserById(params.id);
        case "username":
          return queries.getUserByUsername(params.username);
      }
    })();
    if (!dbUser) {
      throw new NotFoundError({ message: "User not found" });
    }
    const user = transform.user(dbUser);
    return user;
  };
  SearchUsers: (params: params.SearchUsers) => Promise<User[]> = async (
    params,
  ) => {
    const dbUsers = await mutations.searchUsers(params);
    const users = dbUsers.map(transform.user);
    return users;
  };
  UpdateUser: (params: params.UpdateUser) => Promise<User> = async (params) => {
    const updatedUser = await mutations.updateUser(params);

    return updatedUser;
  };
}

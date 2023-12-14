/* eslint-disable @typescript-eslint/naming-convention */
import type { params } from "domain/user/api.params";
import { type DBUser, typesafeUser } from "domain/user/data/user";

import { wetDBClient } from "#lib/wetDBClient";

export const mutations = {
  createUser: async (params: params.CreateUser): Promise<DBUser> => {
    const user = await wetDBClient.user.create({
      data: {
        email: params.email,
        firebaseId: params.firebaseId,
        profilePictureUrl: params.profilePictureUrl,
        username: params.username,
      },
      ...typesafeUser,
    });

    return user;
  },
  deleteUser: async (params: params.DeleteUser): Promise<DBUser> => {
    const user = await wetDBClient.user.delete({
      where: { id: params.id },
      ...typesafeUser,
    });

    return user;
  },
  searchUsers: async (params: params.SearchUsers): Promise<DBUser[]> => {
    /** TODO: Pagination */
    console.log(params);
    const users = await wetDBClient.user.findMany({
      ...typesafeUser,
    });

    return users;
  },
  updateUser: async (params: params.UpdateUser): Promise<DBUser> => {
    const user = await wetDBClient.user.update({
      data: {
        email: params.email,
        profilePictureUrl: params.profilePictureUrl,
        username: params.username,
      },
      where: { id: params.id },
      ...typesafeUser,
    });

    return user;
  },
};

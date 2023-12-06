import type { DBUser } from "domain/user/data/user";

import { wetDBClient } from "#lib/wetDBClient";

export const queries = {
  getUserByEmail: async (email: string): Promise<DBUser | null> => {
    const user = await wetDBClient.user.findUnique({ where: { email } });
    return user;
  },

  getUserById: async (id: string): Promise<DBUser | null> => {
    const user = await wetDBClient.user.findUnique({ where: { id } });
    return user;
  },

  getUserByUsername: async (username: string): Promise<DBUser | null> => {
    const user = await wetDBClient.user.findUnique({ where: { username } });
    return user;
  },
};

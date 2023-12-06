import type { DBUser } from "domain/user/data/user";
import type { User } from "domain/user/models/user";

import { assertValue } from "#util/assertValue";

export const transform = {
  user: (source: DBUser): User => {
    const firebaseAuth = assertValue(
      "firebaseAuth",
      source.UserAuthentication.find(
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        (v) => v.provider == "Firebase",
      ),
    );
    return {
      email: source.email,
      firebaseId: firebaseAuth.externalId,
      id: source.id,
      profilePictureUrl: source.profilePictureUrl,
      username: source.username,
    };
  },
};

export namespace params {
  export type CreateUser = {
    email: string;
    firebaseId: string;
    profilePictureUrl: string;
    username: string;
  };

  export type SearchUsers = {
    limit?: number;
    page?: number;
  };

  export type GetUser = GetUserByEmail | GetUserById | GetUserByUsername;

  export type UpdateUser = {
    email?: string;
    firebaseId?: string;
    id: string;
    profilePictureUrl?: string;
    username?: string;
  };

  export type DeleteUser = {
    id: string;
  };
}

type GetUserById = {
  discriminator: "id";
  id: string;
};
type GetUserByEmail = {
  discriminator: "email";
  email: string;
};
type GetUserByUsername = {
  discriminator: "username";
  username: string;
};

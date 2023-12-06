import type { User } from "domain/user/models/user";

export class UserOutputDto {
  email: string;
  id: string;
  profilePictureUrl: string | null;
  username: string;

  constructor(user: User) {
    this.email = user.email;
    this.id = user.id;
    this.profilePictureUrl = user.profilePictureUrl;
    this.username = user.username;
  }
}

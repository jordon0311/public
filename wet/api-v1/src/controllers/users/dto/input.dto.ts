import {
  IsApiEmail,
  IsApiString,
  IsApiUrl,
} from "src/common/decorators/validation";

export class CreateUser {
  @IsApiEmail()
    email!: string;
  @IsApiString()
    firebaseId!: string;
  @IsApiUrl()
    profilePictureUrl!: string;
  @IsApiString()
    username!: string;
}

export class UpdateUser {
  @IsApiEmail({ optional: true })
    email?: string;
  @IsApiString({ optional: true })
    firebaseId?: string;
  @IsApiUrl({ optional: true })
    profilePictureUrl?: string;
  @IsApiString({ optional: true })
    username?: string;
}

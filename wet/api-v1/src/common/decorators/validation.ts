/* eslint-disable @typescript-eslint/naming-convention */
import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

type Params = {
  optional?: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type ApplyDecorator = <TFunction extends Function, Y>(
  target: TFunction | object,
  propertyKey?: string | symbol | undefined,
  descriptor?: TypedPropertyDescriptor<Y> | undefined,
) => void;

export function IsApiEmail(params?: Params): ApplyDecorator {
  const required = !params?.optional;
  return applyDecorators(
    IsEmail(),
    ApiProperty({
      description: "An email address",
      example: "jordon@wetpages.com",
      required,
      type: String,
    }),
    required ? IsNotEmpty() : IsOptional(),
  );
}

export function IsApiString(params?: Params): ApplyDecorator {
  const required = !params?.optional;
  return applyDecorators(
    IsString(),
    ApiProperty({
      description: "A non-empty string",
      example: "some string",
      required,
      type: String,
    }),
    required ? IsNotEmpty() : IsOptional(),
  );
}

export function IsApiUrl(params?: Params): ApplyDecorator {
  const required = !params?.optional;
  return applyDecorators(
    IsUrl(),
    ApiProperty({
      description: "A valid URL",
      example: "www.wetpages.com",
      required,
      type: String,
    }),
    required ? IsNotEmpty() : IsOptional(),
  );
}

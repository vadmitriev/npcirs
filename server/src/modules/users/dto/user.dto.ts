import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

enum Genger {
  MALE = 'male',
  FEMALE = 'female',
}

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Genger, {
    message: 'gender must be male or female',
  })
  readonly gender: string;
}

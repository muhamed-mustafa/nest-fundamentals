import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 50)
  readonly username: string;

  @IsEmail({}, { message: 'Please enter a valid email' })
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly country: string;
}

import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  id: string;

  username: string;

  email: string;

  @Exclude()
  password: string;

  @Expose({ name: 'address'})
  country: string;

  constructor(user: Partial<UserResponseDto>) {
    Object.assign(this, user);
  }
}

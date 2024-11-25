import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  id: string;

  username: string;

  email: string;

  @Exclude()
  password: string;

  // @Expose({ name: 'address'})
  @Exclude()
  country: string;

  @Expose({ name: 'address'})
  getCountry() {
    return this.country;  
  }
  constructor(user: Partial<UserResponseDto>) {
    Object.assign(this, user);
  }
}

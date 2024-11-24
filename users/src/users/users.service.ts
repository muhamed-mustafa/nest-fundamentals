import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { UserResponseDto } from './dtos/user-response-dto';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];
  findUsers(): UserEntity[] {
    return this.users;
  }

  findUserById(id: string): UserResponseDto {
    const user = this.users.find((user) => user.id === id);
    return new UserResponseDto(user);
  }

  createUser(createUserDto: CreateUserDto): UserResponseDto {
    const user = { id: uuid(), ...createUserDto };
    this.users.push(user);
    return new UserResponseDto(user);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): UserEntity {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };

    return this.users[userIndex];
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

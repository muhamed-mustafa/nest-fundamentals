import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  find(): string[] {
    return ['ADAM', 'JAMES', 'JULIA'];
  }

  @Get(':username')
  findOne(@Param('username') username: string): string {
    return username;
  }

  @Post()
  create(@Body() data: any): string {
    return data;
  }

  @Patch(':username')
  update(@Param('username') username: string): string {
    return username;
  }

  @Delete(':username')
  delete(@Param('username') username: string): string {
    return username;
  }
}

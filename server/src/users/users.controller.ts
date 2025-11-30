import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: Partial<CreateUserDto>) {
    if (
      createUserDto.username &&
      (await this.usersService.findOneByUsername(createUserDto.username))
    ) {
      throw new BadRequestException('Username already exists');
    } else if (
      createUserDto.email &&
      (await this.usersService.findOneByEmail(createUserDto.email))
    ) {
      throw new BadRequestException('Email already in use');
    } else if (
      createUserDto.phone &&
      (await this.usersService.findOneByPhone(createUserDto.phone))
    ) {
      throw new BadRequestException('Phone number already in use');
    }
    return this.usersService.create(createUserDto);
  }

  @Get(':username/:password')
  async findUser(
    @Param('username') username: string,
    @Param('password') password: string,
  ) {
    const user = await this.usersService.findOneByUsername(username);
    if (!user || user.password !== password) {
      throw new BadRequestException('User isnt valid');
    }

    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

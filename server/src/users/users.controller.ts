/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private authService: AuthService) { }

  @Post()
  async create(@Body() createUserDto: Partial<CreateUserDto>) {
    if (
      createUserDto.username &&
      (await this.usersService.findOneByUsername(createUserDto.username))
    ) {
      throw new BadRequestException('Username already exists');
    } else if (createUserDto.password) {
      createUserDto.password = encodePassword(createUserDto.password);
    }

    if (createUserDto.is_admin === undefined) {
      createUserDto.is_admin = false;
    }

    if (createUserDto.email) {
      if (await this.usersService.findOneByEmail(createUserDto.email)) {
        throw new BadRequestException('Email already in use');
      } else {
        createUserDto.password = encodePassword(createUserDto.email);
      }
    } else if (
      createUserDto.phone &&
      (await this.usersService.findOneByPhone(createUserDto.phone))
    ) {
      throw new BadRequestException('Phone number already in use');
    }
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  async loginUser(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    const user = await this.usersService.findOneByUsername(username);

    if (!user || !comparePasswords(password, user.password)) {
      throw new BadRequestException('User is not valid');
    }
    const token = await this.authService.login(user);
    return { ...user, token };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
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
// function compareSync(password: string | undefined, password1: string) {
//   throw new Error('Function not implemented.');
// }

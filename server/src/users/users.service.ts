import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private authService: AuthService
  ) {}

  async create(createUserDto: Partial<CreateUserDto>) {
    const user = this.usersRepository.create(createUserDto);
    const newUser = await this.usersRepository.save(user);
    const token = await this.authService.login(newUser);
    return {...newUser, token};
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  findOneByPhone(phone: number) {
    return this.usersRepository.findOneBy({ phone });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

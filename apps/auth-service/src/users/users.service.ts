import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '@app/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepostiroy: Repository<UserModel>,
  ) {}

  async findOrCreate(dto: CreateUserDto): Promise<UserModel> {
    const userExists = await this.userRepostiroy.exists({
      where: {
        name: dto.name,
        email: dto.email,
      },
    });
    if (!userExists) {
      return this.createUser(dto);
    }
    return await this.userRepostiroy.findOne({
      where: {
        name: dto.name,
        email: dto.email,
      },
    });
  }

  async createUser(dto: CreateUserDto): Promise<UserModel> {
    const nameExists = await this.userRepostiroy.exists({
      where: {
        name: dto.name,
      },
    });
    if (nameExists) {
      throw new BadRequestException('already exist name');
    }

    const emailExists = await this.userRepostiroy.exists({
      where: {
        email: dto.email,
      },
    });
    if (emailExists) {
      throw new BadRequestException('already exist email');
    }

    const userObject = this.userRepostiroy.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    const newUser = await this.userRepostiroy.save(userObject);

    return newUser;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '@app/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepostiroy: Repository<UserModel>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const emailExists = await this.userRepostiroy.exists({
      where: {
        email: createUserDto.email,
      },
    });
    if (emailExists) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'already exists email',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let userPayload: Partial<UserModel>;
    if (createUserDto.password) {
      // Hashing password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      userPayload = {
        ...createUserDto,
        password: hashedPassword,
      };
    } else {
      userPayload = {
        ...createUserDto,
      };
    }

    const userObject = this.userRepostiroy.create(userPayload);
    return await this.userRepostiroy.save(userObject);
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    return await this.userRepostiroy.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOrCreate(createUserDto: CreateUserDto): Promise<UserModel> {
    const userExists = await this.userRepostiroy.exists({
      where: {
        name: createUserDto.name,
        email: createUserDto.email,
      },
    });
    if (!userExists) {
      return this.createUser(createUserDto);
    }
    return await this.userRepostiroy.findOne({
      where: {
        name: createUserDto.name,
        email: createUserDto.email,
      },
    });
  }
}

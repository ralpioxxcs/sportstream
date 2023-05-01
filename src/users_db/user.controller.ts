import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto ) : Promise<User> {
        return this.userService.createUser(createUserDto)
    }

}

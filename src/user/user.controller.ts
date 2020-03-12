import { Controller, Get, Post, Body, UsePipes,ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from "./dto/user-filter.dto";
import { Validate } from 'class-validator';

@Controller('users')
export class UserController {
    constructor(private userService : UserService ) {}

    @Post('adduser')
    @UsePipes(ValidationPipe)
    async addUser(@Body() userDTO :UserDTO ) {
        await this.userService.addUser(userDTO)

        return userDTO;
    }
}

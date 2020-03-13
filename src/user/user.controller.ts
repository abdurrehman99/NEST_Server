import { Controller, Get, Post, Body, UsePipes,ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from "./dto/user-filter.dto";
import { Validate } from 'class-validator';

@Controller('users')
export class UserController {
    constructor(private userService : UserService ) {}

    @Post('register')
    @UsePipes(ValidationPipe)
    async signUp(@Body() userDTO :UserDTO ) {
        const result = await this.userService.signUp(userDTO)
        return result;
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    async signIn(@Body() userDTO :UserDTO ) {
        const result = await this.userService.signIn(userDTO)
        return result; 
    }

}

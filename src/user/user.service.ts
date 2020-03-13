import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from "./user.model";
import { UserDTO } from './dto/user-filter.dto';
import { JwtService } from '@nestjs/jwt';
 
@Injectable()
export class UserService {

    constructor(@InjectModel('User') 
        private readonly userModel :Model<User>,
        private jwtService : JwtService,
    ){}

    async signUp( userDTO : UserDTO){
        const found = await this.userModel.findOne({ username : userDTO.username })
        if(!found){
            const newUser = new this.userModel({
                username : userDTO.username,
                password : userDTO.password,
            }); 
            let result  = await newUser.save()
            return result as User;
        }
        else{
            throw new UnauthorizedException('User already exist !')
        }
    }

    async signIn ( userDTO : UserDTO){
        const found = await this.userModel.findOne({ username : userDTO.username, password : userDTO.password })
        
        if(found){
            const payload = userDTO.username;
            const token = this.jwtService.sign(payload);
            return { token } 
        }
        else throw new UnauthorizedException('Invalid Username Or Passowrd !')   
    }
}

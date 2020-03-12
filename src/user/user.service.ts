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
        const newUser = new this.userModel({
            username : userDTO.username,
            password : userDTO.password,
        }); 
        let result  = await newUser.save()
        return result as User;
    }

    async signIn ( userDTO : UserDTO){
        this.userModel.findOne({ username : userDTO.username, password : userDTO.password }, (user)=>{
            if(!user){
                throw new UnauthorizedException('Invalid Username Or Passowrd !')
                
            }
            else{
                const payload = userDTO.username;
                const token = this.jwtService.sign(payload);
                return token 
            }
        })
        
    }
}

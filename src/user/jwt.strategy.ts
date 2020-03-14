import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy ,ExtractJwt } from 'passport-jwt'
import { JwtPayload } from "./jwt-payload.interface";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.model";
import { Model } from 'mongoose';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel('User') private readonly userModel :Model<User>
    ) {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : 'topSecret'
        });
    }

    async validate(payload :JwtPayload) :Promise<User>{
        const {username} = payload;
        const user = await this.userModel.findOne({ username })

        if(!user){
            throw new UnauthorizedException();
        }

        return user; 
    }
}
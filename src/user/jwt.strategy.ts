import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from '@nestjs/common'
import { Strategy ,ExtractJwt } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : 'topSecret'
        });
    }

    async validate() {
          
    }
}
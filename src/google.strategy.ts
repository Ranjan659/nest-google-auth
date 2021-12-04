import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '648651605208-sob1dqb39l2iamslhiu5ap9tug2cok4e.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL : 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile'] 
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user);
    }
}
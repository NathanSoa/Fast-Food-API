import { sign } from 'jsonwebtoken'
import { TokenGenerator } from '../../../application/ports/TokenGenerator'
import { secret } from '../../../config/secret'


export class JWTTokenGenerator implements TokenGenerator {

    async generate(username: string): Promise<string> {
        if(!secret) {
            throw Error('Missing environment variable JSON_WEB_TOKEN_SECRET')
        }

        return sign({username}, secret, {expiresIn: '1h'})
    }
}
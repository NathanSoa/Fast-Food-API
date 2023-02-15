import { User } from '../domain/User'
import { UserCreateDTO, UserLoginDTO, UserSuccessLoginDTO } from '../dto/UserDTO'
import { UserService } from '../ports/in/UserService'
import { UserRepository } from '../ports/out/UserRepository'
import { TokenGenerator } from '../ports/out/TokenGenerator'

export class UserServiceImpl implements UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenGenerator: TokenGenerator    
    ) {}

    async authenticate(userLoginDTO: UserLoginDTO): Promise<UserSuccessLoginDTO> {
        const userMatches = await this.userRepository.match(new User({email: userLoginDTO.username, ...userLoginDTO}))

        if(!userMatches){
            throw new Error('Invalid login credentials!')
        }

        return {
            jwtToken: await this.tokenGenerator.generate(userLoginDTO.username),
            username: userLoginDTO.username
        }

    }

    async register(userCreateDTO: UserCreateDTO): Promise<void> {
        await this.userRepository.create(new User(userCreateDTO))
        return 
    }
}
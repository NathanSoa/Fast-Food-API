import { User } from '../domain/User'
import { UserLoginDTO } from '../dto/user/UserLoginDTO'
import { UserSuccessLoginDTO } from '../dto/user/UserSuccessLoginDTO'
import { UserCreateDTO } from '../dto/user/UserCreateDTO'
import { UserService } from '../ports/in/UserService'
import { UserRepository } from '../ports/out/UserRepository'

export class UserServiceImpl implements UserService {

    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async authenticate(userLoginDTO: UserLoginDTO): Promise<UserSuccessLoginDTO> {
        throw new Error('Method not implemented.');
    }

    async register(userCreateDTO: UserCreateDTO): Promise<void> {
        await this.userRepository.create(new User(userCreateDTO))
        return 
    }
}
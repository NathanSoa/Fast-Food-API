import { UserCreateDTO, UserLoginDTO, UserSuccessLoginDTO } from '../../dto/UserDTO'

export interface UserService {

    register(userCreateDTO: UserCreateDTO): Promise<void>
    authenticate(userLoginDTO: UserLoginDTO): Promise<UserSuccessLoginDTO>
}
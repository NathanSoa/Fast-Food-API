import { UserCreateDTO } from '../../dto/user/UserCreateDTO'
import { UserLoginDTO } from '../../dto/user/UserLoginDTO'
import { UserSuccessLoginDTO } from '../../dto/user/UserSuccessLoginDTO'

export interface UserService {

    register(userCreateDTO: UserCreateDTO): Promise<void>
    authenticate(userLoginDTO: UserLoginDTO): Promise<UserSuccessLoginDTO>
}
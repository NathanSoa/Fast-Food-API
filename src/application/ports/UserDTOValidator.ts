import { UserCreateDTO, UserLoginDTO } from '../dto/UserDTO'


export interface UserDTOValidator {
    validateUserRegister(input: any): UserCreateDTO,
    validateUserLogin(input: any): UserLoginDTO
}
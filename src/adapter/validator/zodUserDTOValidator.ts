import { z } from 'zod'
import { UserCreateDTO } from '../../application/dto/user/UserCreateDTO'
import { UserLoginDTO } from '../../application/dto/user/UserLoginDTO'
import { ValidationError } from '../../application/exception/ValidationError'
import { UserDTOValidator } from '../../application/ports/out/UserDTOValidator'

export class zodUserDTOValidator implements UserDTOValidator {

    validateUserRegister(input: any): UserCreateDTO {
        try {
            const userRegisterInputValidator = z.object({
                    email: z.string().email('Invalid email format!'),
                    password: z.string().min(8, 'Password should be more than 8 characteres long!')
                })
            userRegisterInputValidator.parse(input)
        } catch(e) {
            throw new ValidationError("Invalid input was sent!")
        }

        return {
            email: input.email,
            password: input.password
        }
    }
    
    validateUserLogin(input: any): UserLoginDTO {
        try {
            const userRegisterInputValidator = z.object({
                    username: z.string().email('Invalid email format!'),
                    password: z.string().min(8, 'Password should be more than 8 characteres long!')
                })
            userRegisterInputValidator.parse(input)
        } catch(e) {
            throw new ValidationError("Invalid input was sent!")
        }

        return {
            username: input.username,
            password: input.password
        }
    }

}
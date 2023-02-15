import { z } from 'zod'
import { UserCreateDTO,UserLoginDTO } from '../../application/dto/UserDTO'
import { ValidationError } from '../../application/exception/ValidationError'
import { UserDTOValidator } from '../../application/ports/out/UserDTOValidator'

export class zodUserDTOValidator implements UserDTOValidator {

    validateUserRegister(input: any): UserCreateDTO {

        const userRegisterInputValidator = z.object({
                email: z.string().email('Invalid email format!'),
                password: z.string().min(8, 'Password should be more than 8 characteres long!')
            })

        const parsedData = userRegisterInputValidator.safeParse(input)

        if(!parsedData.success) {
            const formatedError = parsedData.error.format()
            throw new ValidationError(JSON.stringify(formatedError))
        }
 
        return {
            email: input.email,
            password: input.password
        }
    }
    
    validateUserLogin(input: any): UserLoginDTO {

        const userRegisterInputValidator = z.object({
                username: z.string().email('Invalid email format!'),
                password: z.string().min(8, 'Password should be more than 8 characteres long!')
            })
        const parsedData = userRegisterInputValidator.safeParse(input)

        if(!parsedData.success) {
            const formatedError = parsedData.error.format()
            throw new ValidationError(JSON.stringify(formatedError))
        }

        return {
            username: input.username,
            password: input.password
        }
    }

}
import { User } from "../../domain/User"
import { UserLoginDTO, UserSuccessLoginDTO } from "../../dto/UserDTO"
import { TokenGenerator } from "../../ports/TokenGenerator"
import { UserRepository } from "../../ports/UserRepository"


export async function authenticate(
        userLoginDTO: UserLoginDTO, 
        userRepository: UserRepository,
        tokenGenerator: TokenGenerator
    ): Promise<UserSuccessLoginDTO> {
    const userMatches = await userRepository.match(new User({email: userLoginDTO.username, ...userLoginDTO}))

    if(!userMatches){
        throw new Error('Invalid login credentials!')
    }

    return {
        jwtToken: await tokenGenerator.generate(userLoginDTO.username),
        username: userLoginDTO.username
    }

}
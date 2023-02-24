import { User } from "../../domain/User"
import { UserCreateDTO } from "../../dto/UserDTO"
import { DuplicatedEntityError } from "../../exception/DuplicatedEntityError"
import { UserRepository } from "../../ports/UserRepository"

export async function register(
        userCreateDTO: UserCreateDTO,
        userRepository: UserRepository
    ): Promise<void> {
    const duplicatedEmail = await userRepository.existsByEmail(userCreateDTO.email)

    if(duplicatedEmail){
        throw new DuplicatedEntityError(`Email ${userCreateDTO.email} already in use`)
    }

    await userRepository.create(new User(userCreateDTO))
    return 
}
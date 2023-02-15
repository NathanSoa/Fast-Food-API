import { User } from "../../domain/User"

export interface UserRepository {
    
    create(user: User): Promise<void | string>
    match(user: User): Promise<boolean>
}
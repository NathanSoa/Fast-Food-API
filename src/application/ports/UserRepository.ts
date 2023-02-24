import { User } from "../domain/User"

export interface UserRepository {
    
    create(user: User): Promise<void>
    match(user: User): Promise<boolean>
    existsByEmail(email: string): Promise<boolean>
}
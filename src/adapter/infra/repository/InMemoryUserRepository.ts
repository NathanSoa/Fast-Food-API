import { User } from "../../../application/domain/User"
import { UserRepository } from "../../../application/ports/out/UserRepository"

export class InMemoryUserRepository implements UserRepository {

    items = new Array()

    async create(user: User): Promise<void> {
        this.items.push(user)
    }

    async match(user: User): Promise<boolean> {
        return this.items
        .filter(eachUser => eachUser.getEmail() === user.getEmail() && eachUser.getPassword() === user.getPassword()).length > 0
    }

    async existsByEmail(email: string): Promise<boolean> {
        return this.items.filter(each => each.getEmail() === email).length > 0
    }
}
import { User } from "../../../application/domain/User"
import { UserRepository } from "../../../application/ports/out/UserRepository"

export class InMemoryUserRepository implements UserRepository {

    items = new Array()

    async create(user: User): Promise<void> {
        this.items.push(user)
    }

    async match(user: User): Promise<boolean> {
        return this.items
        .filter(eachUser => eachUser.email === user.email && eachUser.password === user.password).length > 0
    }

    async existsByEmail(email: string): Promise<boolean> {
        return this.items.filter(each => each.email === email).length > 0
    }
}
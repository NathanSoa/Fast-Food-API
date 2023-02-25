import { User } from "../../../application/domain/User"
import { UserRepository } from "../../../application/ports/UserRepository"

export class InMemoryUserRepository implements UserRepository {

    items = new Array()

    async create(user: User): Promise<void> {
        this.items.push(user)
    }

    async match(user: User): Promise<boolean> {
        return this.items
        .find(eachUser => eachUser.email === user.email && eachUser.password === user.password)
    }

    async existsByEmail(email: string): Promise<boolean> {
        return this.items.find(each => each.email === email)
    }
}
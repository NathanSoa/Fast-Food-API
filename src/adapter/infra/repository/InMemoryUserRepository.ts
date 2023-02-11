import { User } from "../../../application/domain/User"
import { UserRepository } from "../../../application/ports/out/UserRepository"

export class InMemoryUserRepository implements UserRepository {

    items = new Array()

    async create(user: User): Promise<void | string> {
        const duplicatedEmail = await this.existsByEmail(user.getEmail())

        if(duplicatedEmail){
            throw new Error(`Email ${user.getEmail()} already in use`)
        }

        this.items.push(user)
    }

    private async existsByEmail(email: string): Promise<boolean> {
        return this.items.filter(each => each.getEmail() === email).length > 0
    }
}
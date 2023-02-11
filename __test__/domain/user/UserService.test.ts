import { beforeEach, describe, expect, it } from 'vitest'
import { UserCreateDTO } from '../../../src/application/dto/user/UserCreateDTO'
import { UserService } from '../../../src/application/ports/in/UserService'
import { UserServiceImpl } from '../../../src/application/service/UserServiceImpl'
import { InMemoryUserRepository } from '../../../src/adapter/infra/repository/InMemoryUserRepository'

describe('User use cases', () => {
 
    const repository = new InMemoryUserRepository()
    const service: UserService = new UserServiceImpl(repository)

    beforeEach(() => {
        repository.items = new Array()
    })

    it('should create a new user', async () => {
        const userCreateDTO: UserCreateDTO = {email: 'test@mail.com', password: 'supersecurepassword'}
        await service.register(userCreateDTO)
        expect(repository.items.length).toBe(1)
    })

    it('should throw error when user send a duplicated email', async () => {
        const userCreateDTO: UserCreateDTO = {email: 'test@mail.com', password: 'supersecurepassword'}
        await service.register(userCreateDTO)
        expect(service.register(userCreateDTO)).rejects.toThrow()
        expect(repository.items.length).toBe(1)
    })
})
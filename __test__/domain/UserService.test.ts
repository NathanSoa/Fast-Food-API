import { beforeEach, describe, expect, it } from 'vitest'
import { UserService } from '../../src/application/ports/in/UserService'
import { UserServiceImpl } from '../../src/application/service/UserServiceImpl'
import { InMemoryUserRepository } from '../../src/adapter/infra/repository/InMemoryUserRepository'
import { UserLoginDTO, UserCreateDTO } from '../../src/application/dto/UserDTO'
import { JWTTokenGenerator } from '../../src/adapter/infra/authentication/JWTTokenGenerator'

describe('User use cases', () => {

    const repository = new InMemoryUserRepository()
    const tokenGenerator = new JWTTokenGenerator()
    const service: UserService = new UserServiceImpl(repository, tokenGenerator)

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

    it('should authenticate an valid user', async () => {
        const userCreateDTO: UserCreateDTO = {email: 'test@mail.com', password: 'supersecurepassword'}
        const userLoginDTO: UserLoginDTO = {username: 'test@mail.com', password: 'supersecurepassword'}

        await service.register(userCreateDTO)
        const login = await service.authenticate(userLoginDTO)

        expect(login.jwtToken).toBeTruthy()
        expect(login.username).toBe(userLoginDTO.username)
    })
})
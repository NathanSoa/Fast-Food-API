import { Router } from 'express'
import { UserService } from '../../../application/ports/in/UserService'
import { TokenGenerator } from '../../../application/ports/out/TokenGenerator'
import { UserRepository } from '../../../application/ports/out/UserRepository'
import { UserServiceImpl } from '../../../application/service/UserServiceImpl'
import { JWTTokenGenerator } from '../../infra/authentication/JWTTokenGenerator'
import { InMemoryUserRepository } from '../../infra/repository/InMemoryUserRepository'

const userRoute = Router()

const repository: UserRepository = new InMemoryUserRepository()
const tokenGenerator: TokenGenerator = new JWTTokenGenerator()
const service: UserService = new UserServiceImpl(repository, tokenGenerator)

userRoute.route('/user')
        .post(async (req, res) => {
            const response = await service.register(req.body)
            res.send(response)
        })

userRoute.route('/user/auth')
        .post(async (req, res) => {
            const response = await service.authenticate(req.body)
            res.send(response)
        })

export { userRoute }

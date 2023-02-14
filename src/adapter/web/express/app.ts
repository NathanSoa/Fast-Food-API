import express from 'express'
import { errorHandler } from './middleware/errorHandler'
import { userRoute } from './routes/routes'

const app = express()

app.use(express.json())
app.use(userRoute)
app.use(errorHandler)

export { app }
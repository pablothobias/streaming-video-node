import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { videoRoutes } from './routes'

const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(helmet())
app.use(morgan('combined'))

app.use('/api/videos', videoRoutes)

export default app

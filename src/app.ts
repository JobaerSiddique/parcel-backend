import express, { Application } from 'express'

import globalErrorHandler from './app/middleware/globalHandlerError'
import notFound from './app/middleware/notFound'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './app/route'
const app:Application = express()


app.use(express.json())








app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:3000', // Remove trailing slash
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))




// use route

app.get('/', (req, res) => {
  res.send('Hurry Parcel  server is Started')
})
app.use('/api/v1',router)
app.use(globalErrorHandler)
// not found route
app.use(notFound)


export default app;
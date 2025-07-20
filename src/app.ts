import express, { Application } from 'express'

import globalErrorHandler from './app/middleware/globalHandlerError'
import notFound from './app/middleware/notFound'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './app/route'
const app:Application = express()


app.use(express.json())



// Define allowed origins
const allowedOrigins = ['http://localhost:5173','https://dapper-nasturtium-bce1b7.netlify.app']; 

// Configure CORS
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));
app.use(cookieParser());







// use route

app.get('/', (req, res) => {
  res.send('Hurry Parcel  server is Started')
})
app.use('/api/v1',router)
app.use(globalErrorHandler)
// not found route
app.use(notFound)


export default app;
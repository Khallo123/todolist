import express from 'express'
const app = express()
import dotenv from 'dotenv'
import userRoute from './routes/userRoute'

dotenv.config()
const PORT = process.env.PORT

app.use(express.json())

app.use('/api/user', userRoute)


app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
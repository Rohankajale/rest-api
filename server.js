require('dotenv').config()

const express = require('express')
const app = express()
const mongoose  = require('mongoose')

app.use(express.json())

const charactersRouter = require('./routes/characters')
app.use('/characters', charactersRouter)



mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    app.listen(3000, () => {
        console.log('Server Started')
    })
}).catch((err) => {
    console.log(err)
})


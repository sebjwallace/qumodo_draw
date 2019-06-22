const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const PORT = 3000

// Skip CORS headaches and serve resources via API for local app

app.get('/model',(req,res) => {
    res.json(require('./public/model.json'))
})

app.get('/model/weights',(req,res) => {
    res.download('./public/model.weights.bin')
})

app.listen(PORT, () => {
    console.log(`Serving model on port ${PORT}`)
})
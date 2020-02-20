const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => res.status(200).send(`Welcome to Tasky!`))

app.listen(port, () => console.log(`Server listening to port ${port}!`))
const express = require("express")

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World from the node js application')
})

app.listen(5050, () => {
    console.log('Server is running on http://localhost:5050')
})

// Node js install => LTS
// NPM install => LTS
// Express install => LTS
// Mysql|postgres 
// Dependencies will increase
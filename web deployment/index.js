const express = require("express")

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!! Our first node js program')
})

app.get('/contact', (req, res) => {
  res.send('This is contact page')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
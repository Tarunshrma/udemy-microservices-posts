const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const posts = {}
const app = express()
app.use(bodyParser.json())
app.use(cors());

//TODO: CAN BE REMOVED, NOT BEING USE
app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = {
    id,
    title,
  }

  await axios.post("http://event-bus-clusterip-srv:4005/events",{
    type: "PostCreated",
    data : {
      id, title
    }
  })

  res.status(201).send(posts[id])
  
})

app.post('/events', (req, res) => {

})

app.listen(4000, () => {
  console.log('Listening to port 4000')
})

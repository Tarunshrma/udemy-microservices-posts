const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get("/posts",(req,res)=>{
    res.status(200).send(posts)
})

app.post('/events', (req, res) => {
  const eventType = req.body.type

  if (eventType == 'PostCreated') {
    const { id, title } = req.body.data

    posts[id] = { id, title, comments: [] }
  }

  if (eventType == 'CommentCreated') {
    const { id, content, postId, status } = req.body.data

    const post = posts[postId]
    post.comments.push({ id, content, status })
  }

  console.log("Posts : " + JSON.stringify(posts));
})

app.listen(4003, () => {
  console.log('Listning at port 4003')
})

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  console.log("Requesting comments for post id: " + req.params.id);
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events",{
    type: "CommentCreated",
    data : {
      postId:req.params.id,
      id: commentId,
      content,
      status:"Pending"
    }
  })

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {

})

app.listen(4001, () => {
  console.log('Listening on 4001');
});

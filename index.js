const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const {connectDB} = require("./DBConnection/dbconnection")
const userRouter = require("./routers/users")
const authRouter = require("./routers/auth")
const postRouter = require("./routers/post")
const conversationRouter = require('./routers/conversation')
const messageRouter = require("./routers/messages")

const app = express();
const PORT = 3000;
connectDB();


// middleware
app.use(bodyParser.json())
app.use(cors());
app.use("/api/auth" ,authRouter)
app.use("/api/user" ,userRouter)
app.use("/api/post" ,postRouter)
app.use("/api/conversation",conversationRouter)
app.use("/api/messages",messageRouter)



app.get('/', (req, res) => {
  res.send('server is running')
});

app.listen(PORT, () => {
  console.log('server started');
});
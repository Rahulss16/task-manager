const express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./routes')
const InitiateMongoServer = require('./config/db')

// Initiate Mongo Server
InitiateMongoServer()

const app = express()

// PORT
const PORT = process.env.PORT || 1997

// Middleware
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf;
    },
  })
);
app.get('/', (req, res) => {
  res.json({ message: 'API Working' })
})
app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization'
  )
  next()
})

app.use('/auth', Routes.Authentication)
app.use('/tasks', Routes.Task)

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`)
})

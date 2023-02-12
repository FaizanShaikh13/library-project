const express = require("express");
const { sequelize } = require("./models");
const app = express();
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const rateLimit = require('express-rate-limit')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const limiter = rateLimit({
  max:100,
  windowMs: 60*60*1000,
  message: "Too many request from this IP, please try again in an hour"
})

app.use('/api',limiter)

app.get("/", (req, res) => {
  res.send("Working...");
});

const options ={
  definition:{
    openapi:"3.0.0",
    info:{
      title:"Library API",
      version:"1.0.0",
      description:"A simple Library API"
    },
    servers:[
      {
        url:"http://localhost:9000",
      description:"A simple Library API"

      }
    ] 
  },
  apis:["./routes/*.js"]
}

const specs =swaggerJsDoc(options)


app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs))
app.use("/api", require("./routes/userwithoutauth"));


app.use(require("./middleware/auth"));

app.use("/api/user", require("./routes/user"));
app.use("/api/book", require("./routes/book"));


app.listen(9000, async () => {
  console.log('inside');
  await sequelize.authenticate();
  console.log("Server is running");
});

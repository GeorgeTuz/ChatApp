const express = require("express");
const mongoose = require("mongoose");
const bodyParser  = require("body-parser");
const app = express();
var cors = require('cors');

const port = process.env.PORT || 8080;
mongoose.connect("mongodb://localhost:27017/",{ useNewUrlParser: true,useUnifiedTopology: true  });


app.use(cors());
app.use(bodyParser.json());
app.use("/api",require("./api"));

app.listen(4000,() =>{
    console.log("server is listening21");
});
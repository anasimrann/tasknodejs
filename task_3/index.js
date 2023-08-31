const express = require("express");
const app = express();
require("dotenv").config();
const userRoute = require("./Router/userRoute");


app.use(express.json());
app.use("/api",userRoute);
PORT  = process.env.PORT || 4000;




app.listen(PORT,()=>{
    console.log(`server is running at PORT ${PORT}`)
});


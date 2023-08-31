const express = require("express");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 4000;


app.get("/", (req, res,next) => {
    try {
        res.write("Welcome to Nodejs Server");
        res.end();
    }
    catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    res.status(500).send("internel server error");
})

app.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`)
})

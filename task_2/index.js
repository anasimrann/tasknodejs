const express = require("express");
const { handleFile, readFileAsync } = require("./fileFunction");
const app = express();
require("dotenv").config();

const path = require("path");

const filePath = path.join(__dirname, './myfile.txt');


const PORT = process.env.PORT || 4000;

const startServer = () => {
    return new Promise((resolve, reject) => {
        try {
            app.listen(PORT, () => {
                console.log(`server is running at ${PORT}`);
            });
            resolve();
        }
        catch (err) {
            reject(err);
        }
    })
}

startServer().then(() => {
    readFileAsync(filePath).then((data) => {
        console.log(data);

    }).catch((err) => {
        throw new Error(err);
    })
}).catch((err) => {
    throw new Error(err);
});

app.use((err, req, res) => {
    console.log(`${err}`);
})


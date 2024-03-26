require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT;

app.get("/", (_req, res) => {
    res.send("Hello");
})


app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
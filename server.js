require("dotenv").config();

const express = require("express");
const cors = require("cors");
const {inventoryRouter} = require("./routes/inventory.js")

const app = express();

const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use("/api", inventoryRouter)

app.get("/", (_req, res) => {
    res.send("Hello");
})


app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
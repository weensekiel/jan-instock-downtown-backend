require("dotenv").config();

const dotenv = require("dotenv");
const userRoutes = require("./routes/user-routes");
const express = require("express");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use("/", userRoutes);


app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
import "dotenv/config";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/warehouse-routes.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use("/", userRoutes);


app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
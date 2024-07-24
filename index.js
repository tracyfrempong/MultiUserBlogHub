import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Users, Posts, Categories, User_Posts } from "./db/db.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;




app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

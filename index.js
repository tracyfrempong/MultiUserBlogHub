import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import { Users, Posts, Categories } from "./db/index.js";
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';


const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(express.json());
const port = 3000;

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

export default app;
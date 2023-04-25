import express from "express";
import cors from "cors";
import rootRouting from "@src/routes";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/", rootRouting);

export default app;

import "reflect-metadata";
import express from "express";
import "./database/dataSource"
import { routes } from "./routes";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cors from "cors";

dotenv.config()

const app = express();

app.use(cors(
  {origin: '*'}
))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(routes);

app.listen(5000, ()=> console.log("Server is running"));
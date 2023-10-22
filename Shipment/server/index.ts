// Library Imports
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";

// File Imports
import connectToDB from "./config/Constant";

// Route Imports
import userRouter from "./modules/user/Routes";
import ShipmentRouter from "./modules/shipment/Routes";

// Initializing server
const app: Express = express();
dotenv.config();
app.use(cors());
const port = process.env.PORT || "3001";

app.get("/", (req: Request, res: Response) => {
  res.send("Server side");
});

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});

// Connect to DB function call
connectToDB();

app.use(express.json());

// Using routes
app.use("/user", userRouter);
app.use("/shipment", ShipmentRouter);

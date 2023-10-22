// Library Imports
import express from "express";

// File Imports
import {
  addWorker,
  login,
  signUp,
  getWorkers,
  deleteUserById,
} from "./Controller";

// Defining user router
const userRouter = express.Router();

// Routes for API end points
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/addworker", addWorker);
userRouter.get("/getall", getWorkers);
userRouter.delete("/remove/:id", deleteUserById);

export default userRouter;

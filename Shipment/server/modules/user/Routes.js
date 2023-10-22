"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Library Imports
const express_1 = __importDefault(require("express"));
// File Imports
const Controller_1 = require("./Controller");
// Defining user router
const userRouter = express_1.default.Router();
// Routes for API end points
userRouter.post("/signup", Controller_1.signUp);
userRouter.post("/login", Controller_1.login);
userRouter.post("/addworker", Controller_1.addWorker);
userRouter.get("/getall", Controller_1.getWorkers);
userRouter.delete("/remove/:id", Controller_1.deleteUserById);
exports.default = userRouter;

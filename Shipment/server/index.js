"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Library Imports
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// File Imports
const Constant_1 = __importDefault(require("./config/Constant"));
// Route Imports
const Routes_1 = __importDefault(require("./modules/user/Routes"));
const Routes_2 = __importDefault(require("./modules/shipment/Routes"));
// Initializing server
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
const port = process.env.PORT || "3001";
app.get("/", (req, res) => {
    res.send("Server side");
});
app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});
// Connect to DB function call
(0, Constant_1.default)();
app.use(express_1.default.json());
// Using routes
app.use("/user", Routes_1.default);
app.use("/shipment", Routes_2.default);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Library Imports
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Connection to MongoDB
 */
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoURI = process.env.MONGO_URI || "your_default_mongodb_uri";
    mongoose_1.default.connect(mongoURI, {});
    mongoose_1.default.connection.on("connected", () => {
        console.log("Connected to MongoDB");
    });
    mongoose_1.default.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });
});
exports.default = connectToDB;

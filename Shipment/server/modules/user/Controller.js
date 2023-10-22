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
exports.deleteUserById = exports.getWorkers = exports.addWorker = exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Schema model Imports
const User_1 = __importDefault(require("../../models/User"));
/**
 * Admin Signup API
 */
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    const alreadyExists = yield User_1.default.findOne({ email });
    if (alreadyExists) {
        return res
            .status(403 /* StatusCodes.ALREADYEXISTS */)
            .json({ message: "Signup failed" /* Messages.SIGNUP_FAILED */ });
    }
    // Hash the password with salt
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    // Store user in db
    const user = new User_1.default({ username, email, password: hashedPassword, role });
    yield user.save();
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, String(process.env.SECRET_KEY), {
        expiresIn: "1h",
    });
    try {
        res
            .status(200 /* StatusCodes.SUCCESS */)
            .json({ message: "User Signup successful" /* Messages.SIGNUP_SUCCESS */, token });
    }
    catch (error) {
        console.error(error);
        res
            .status(500 /* StatusCodes.SERVERERROR */)
            .json({ message: "Internal server error" /* Messages.SERVER_ERROR */ });
    }
});
exports.signUp = signUp;
/**
 * Login API
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user exists via email
        const { email, password, role } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res
                .status(401 /* StatusCodes.UNAUTHORIZED */)
                .json({ message: "User not exists" /* Messages.NOT_EXISTS */ });
        }
        // Decrypt and check password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401 /* StatusCodes.UNAUTHORIZED */)
                .json({ message: "User not exists" /* Messages.NOT_EXISTS */ });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, String(process.env.SECRET_KEY), {
            expiresIn: "1h",
        });
        res
            .status(200 /* StatusCodes.SUCCESS */)
            .json({ role: user.role, token: token, id: user._id });
    }
    catch (error) {
        console.error(error);
        res
            .status(500 /* StatusCodes.SERVERERROR */)
            .json({ message: "Internal server error" /* Messages.SERVER_ERROR */ });
    }
});
exports.login = login;
/**
 * Worker signup API
 */
const addWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    const alreadyExists = yield User_1.default.findOne({ email });
    if (alreadyExists) {
        return res
            .status(403 /* StatusCodes.ALREADYEXISTS */)
            .json({ message: "Signup failed" /* Messages.SIGNUP_FAILED */ });
    }
    // Hash the password with salt
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    // Store worker in db
    const user = new User_1.default({
        username,
        email,
        password: hashedPassword,
        role: "Worker",
    });
    yield user.save();
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, String(process.env.SECRET_KEY), {
        expiresIn: "1h",
    });
    try {
        res
            .status(200 /* StatusCodes.SUCCESS */)
            .json({ message: "User Signup successful" /* Messages.SIGNUP_SUCCESS */, token });
    }
    catch (error) {
        console.error(error);
        res
            .status(500 /* StatusCodes.SERVERERROR */)
            .json({ message: "Internal server error" /* Messages.SERVER_ERROR */ });
    }
});
exports.addWorker = addWorker;
/**
 * Get workers API
 */
const getWorkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workers = yield User_1.default.find({ role: "Worker" });
        res.json({ workers });
    }
    catch (error) {
        console.error("Error fetching workers:", error);
        res
            .status(500 /* StatusCodes.SERVERERROR */)
            .json({ message: "Failed to fetch workers" });
    }
});
exports.getWorkers = getWorkers;
/**
 * Delete Worker API
 */
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const deletedUser = yield User_1.default.findByIdAndRemove(userId);
        if (!deletedUser) {
            return res
                .status(404 /* StatusCodes.NOTFOUND */)
                .json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res
            .status(500 /* StatusCodes.SERVERERROR */)
            .json({ message: "Failed to delete user" });
    }
});
exports.deleteUserById = deleteUserById;

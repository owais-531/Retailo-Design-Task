// Library Imports
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// File Imports
import StatusCodes from "../../config/StatusCodes";
import Messages from "../../config/Messages";

// Schema model Imports
import User from "../../models/User";

/**
 * Admin Signup API
 */
const signUp = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    return res
      .status(StatusCodes.ALREADYEXISTS)
      .json({ message: Messages.SIGNUP_FAILED });
  }
  // Hash the password with salt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Store user in db
  const user = new User({ username, email, password: hashedPassword, role });
  await user.save();
  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, String(process.env.SECRET_KEY), {
    expiresIn: "1h",
  });
  try {
    res
      .status(StatusCodes.SUCCESS)
      .json({ message: Messages.SIGNUP_SUCCESS, token });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.SERVERERROR)
      .json({ message: Messages.SERVER_ERROR });
  }
};

/**
 * Login API
 */
const login = async (req: Request, res: Response) => {
  try {
    // Check if user exists via email
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: Messages.NOT_EXISTS });
    }
    // Decrypt and check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: Messages.NOT_EXISTS });
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      String(process.env.SECRET_KEY),
      {
        expiresIn: "1h",
      }
    );
    res
      .status(StatusCodes.SUCCESS)
      .json({ role: user.role, token: token, id: user._id });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.SERVERERROR)
      .json({ message: Messages.SERVER_ERROR });
  }
};

/**
 * Worker signup API
 */
const addWorker = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    return res
      .status(StatusCodes.ALREADYEXISTS)
      .json({ message: Messages.SIGNUP_FAILED });
  }
  // Hash the password with salt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Store worker in db
  const user = new User({
    username,
    email,
    password: hashedPassword,
    role: "Worker",
  });
  await user.save();
  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, String(process.env.SECRET_KEY), {
    expiresIn: "1h",
  });
  try {
    res
      .status(StatusCodes.SUCCESS)
      .json({ message: Messages.SIGNUP_SUCCESS, token });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.SERVERERROR)
      .json({ message: Messages.SERVER_ERROR });
  }
};

/**
 * Get workers API
 */
const getWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await User.find({ role: "Worker" });
    res.json({ workers });
  } catch (error) {
    console.error("Error fetching workers:", error);
    res
      .status(StatusCodes.SERVERERROR)
      .json({ message: "Failed to fetch workers" });
  }
};

/**
 * Delete Worker API
 */
const deleteUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res
        .status(StatusCodes.NOTFOUND)
        .json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(StatusCodes.SERVERERROR)
      .json({ message: "Failed to delete user" });
  }
};

export { signUp, login, addWorker, getWorkers, deleteUserById };

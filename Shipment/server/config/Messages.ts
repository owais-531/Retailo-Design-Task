// Response Messages
const enum Messages {
  SIGNUP_SUCCESS = "User Signup successful",
  LOGIN_SUCCESS = "User Login successful",
  SIGNUP_FAILED = "Signup failed",
  LOGIN_FAILED = "Login failed",
  BAD_REQUEST = "Bad request",
  SERVER_ERROR = "Internal server error",
  FIELD_EMPTY = "Field(s) is empty",
  ACTION_NO_SUCESS = "Action could not be completed",
  ACTION_SUCCESS = "Action completed successfully",
  NOT_FOUND = "Not found",
  NOT_EXISTS = "User not exists",
  CHANGE_SUCESS = "Change successful",
  CHANGE_FAILED = "Change failed",
  DELETE_SUCCESS = "Deleted Successfully",
}

export default Messages;


// Functions
function errorHandler(error, response) {
  if (typeof (error) === "string") {
    // These are custom errors coming from the application
    const is404 = error.toLowerCase().endsWith("not found");
    const statusCode = is404 ? 404 : 400;
    return response.status(statusCode).json({
      message: error
    })
  }

  if (error.name === "UnauthorizedError") {
    // JWT Authentication Error
    return response.status(401).json({
      message: "Invalid Token"
    });
  }

  // Otherwise, set the default error status code
  // to 500 internal error
  console.log("(Server)[API | Errors-handler:errorHandler]: ERROR -", error);
  if (error.message == "Internal Server Error") {
    console.log("(Server)[API | Errors-handler:errorHandler -> 'Internal Server Error']: ERROR -", error);
  }
  return response.status(500).json({
    message: error.message
  });
}

// Variables declaration
export {errorHandler};

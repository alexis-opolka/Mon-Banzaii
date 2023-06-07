import { db, errorHandler, jwtMiddleware } from "pages/api"

// Functions
function apiHandler(handler) {
  return async (req, res) => {
    console.log("(Server)[API | Api-Handlers:apiHandler]: (Start) LOG -", req, res)
    const method = req.method.toLowerCase();

    // Before all, let's check if the handler
    // supports the HTTP method
    if (!handler[method]) {
      // The Handler doesn't support it
      // We need to deny the request and return a
      // 405 Not Allowed status code
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    try {
      // Let's initialize the DB if required
      if (!db.initialized) {
        console.log("(Server)[API | Api-Handlers:apiHandler]: LOG - The DB is being initialized")
        await db.initialize();
      }

      console.log("(Server)[API | Api-Handlers:apiHandler]: LOG - The JWT Middleware is called")
      // Let's call for our Middleware
      await jwtMiddleware(req, res);

      console.log("(Server)[API | Api-Handlers:apiHandler]: LOG - Let's call the handler with the method and req and res objects")
      // Let's handle our routing
      await handler[method](req, res);
    } catch (error) {
      // Let's catch any error and throw it
      // to our `errorHandler` function
      console.log("(Server)[API | Api-Handlers:apiHandler]: ERROR -", error)
      errorHandler(error, res);
    }
  }
}

// Variables declaration
export {apiHandler}

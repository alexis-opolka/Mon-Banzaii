import { db, errorHandler, jwtMiddleware } from "pages/api"

// Functions
function apiHandler(handler) {
  return async (req, res) => {
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
        await db.initialize();
      }

      // Let's call for our Middleware
      await jwtMiddleware(req, res);

      // Let's handle our routing
      await handler[method](req, res);
    } catch (error) {
      // Let's catch any error and throw it
      // to our `errorHandler` function
      errorHandler(error, res);
    }
  }
}

// Variables declaration
export {apiHandler}

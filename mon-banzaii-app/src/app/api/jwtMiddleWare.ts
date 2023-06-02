import {expressjwt} from "express-jwt"
import util from "util";
import getConfig from "next/config";

// Functions
function jwtMiddleware(request, response) {
  const middleware = expressjwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ["HS256"]
  }).unless({
    path: [
      // Public routes wich we won't require any authentication
      "/api/users/register",
      "/api/users/authenticate"
    ]
  });

  return util.promisify(middleware)(request, response);
}


// Variables declaration
const { serverRuntimeConfig } = getConfig();
export {jwtMiddleware}

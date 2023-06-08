import {expressjwt} from "express-jwt"
import util from "util";
import getConfig from "next/config";

// Variables declaration
const { serverRuntimeConfig } = getConfig();
console.log("(Server)[API | /jwtMiddleWare:GLOBAL:ServerRuntimeConfig]: LOG -", serverRuntimeConfig);

// Functions
export function jwtMiddleware(request, response) {
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

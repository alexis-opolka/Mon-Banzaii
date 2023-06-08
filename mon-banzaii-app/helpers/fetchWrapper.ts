import getConfig from "next/config";
import { userService } from "services";
// Functions
function request(method) {
  return async (url: string, body?: any) => {
    var requestOptions;
    if (body) {
      requestOptions = {
        method,
        headers: authHeader(url),
        body,
      }
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
      console.log(requestOptions);
    } else {
      requestOptions = {
        method,
        headers: authHeader(url),
      };

      const res = await fetch(url, requestOptions);
      const data = await res.body;

      console.log("(Client)[Helpers | fetchWrapper:request]: LOG -", requestOptions, res, data);
    }
    return fetch(url, requestOptions).then(handleResponse)
    .catch((error) => {
      console.log("(Client)[Helpers | fetchWrapper:request]: ERROR -", error);
    })
  }
}

function authHeader(url) {
  // We return an authorization header with jwt
  // if user is logged in and the request is
  // to the api URL
  console.log("(Client)[Helpers | fetchWrapper:authHeader]: LOG -", url, userService?.userValue, userService?.userValue?.token, url.startsWith(publicRuntimeConfig.apiUrl), userService?.userValue?.token && url.startsWith(publicRuntimeConfig.apiUrl));
  const user = userService?.userValue;
  const isLoggedIn = user?.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
    // The user is indeed logged in and the URL requested
    // is the API URL
    return {
      // We return the JWT in the header
      Authorization: `Bearer ${user.token}`
    };
  } else {
    // Otherwise, we just return an empty set
    // No particular header
    return {};
  }
}

async function handleResponse(response) {
  const isJSON = response.headers?.get("content-type")?.includes("application/json");
  const data = isJSON ? await response.json() : null;

  console.log("(Client)[Helpers | fetchWrapper:handleResponse]: LOG -", response);

  // check for error response codes
  // as the response status code isn't 200 ok
  if (!response.ok) {
    // If the API returned 401 Unauthorized or 403 Forbidden
    // response code
    if ([401, 403].includes(response.status) && userService.userValue) {
      // We automatically (and forcefully) logout the user
      userService.logout();
    }

    // Let's get the error message from the body
    // if it doesn't exist, just default the message
    // to the response status
    const error = (data && data.message) || response.statusText;
    console.log("(Client)[Helpers | fetchWrapper:handleResponse]: ERROR -", error)
    return Promise.reject(error);
  }

  return data
}

// Variables
const { publicRuntimeConfig } = getConfig();
console.log(publicRuntimeConfig)

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};
export default fetchWrapper;

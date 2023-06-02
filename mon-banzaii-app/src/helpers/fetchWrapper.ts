import { userAuthService } from "@/services";


// Functions
function request(method) {
  return (url, body) => {
    const requestOptions = {
      method,
      headers: authHeader(url),
    };
    if (body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(url, requestOptions).then(handleResponse);
  }
}

function authHeader(url) {
  // We return an authorization header with jwt
  // if user is logged in and the request is
  // to the api URL
  const user = userAuthService.userValue;
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

  // check for error response codes
  // as the response status code isn't 200 ok
  if (!response.ok) {
    // If the API returned 401 Unauthorized or 403 Forbidden
    // response code
    if ([401, 403].includes(response.status) && userAuthService.userValue) {
      // We automatically (and forcefully) logout the user
      userAuthService.logout();
    }

    // Let's get the error message from the body
    // if it doesn't exist, just default the message
    // to the response status
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data
}

// Variables
console.log(process.env);
const publicRuntimeConfig = process.env.HOST;

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

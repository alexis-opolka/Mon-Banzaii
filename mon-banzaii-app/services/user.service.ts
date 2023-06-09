// The import area
import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "../helpers";
import { alertService } from "./alert.service";

// The function definition area
async function login(username: String, password: String) {
  const user = await fetchWrapper.post(`${baseURL}/authenticate`, {username, password});

  // publish user to subscribers
  userSubject.next(user);
  // store in local storage to stay logged in between page refreshes
  localStorage.setItem('user', JSON.stringify(user));
  // Set the internal variable of logout to false
  // In any case, if we're logged in, we can't be logged out
  // at the same time
  userHasBeenLoggedOut = false;
}

async function logout(){
  // Let's clear our previous notifications
  alertService.clear();

  // remove user from local storage,
  localStorage.removeItem('user');
  // publish null to user subscribers,
  userSubject.next(null);
  // inform internally that the user has been logged out
  userHasBeenLoggedOut = true;
  // and redirect to root page
  Router.push('/');
}

async function register(user: String){
  await fetchWrapper.post(`${baseURL}/register`, user);
}

async function getAll() {
  return await fetchWrapper.get(baseURL);
}

async function getById(id) {
  return await fetchWrapper.get(`${baseURL}/${id}`);
}

async function update(id, parameters) {
  await fetchWrapper.put(`${baseURL}/${id}`, parameters);

  // If the user is logged in, we need to also update
  // the localStorage record, only if it's theirs
  if (id === userSubject.value.id) {
    // Let's update the local storage
    const user = { ...userSubject.value, ...parameters};
    localStorage.setItem('user', JSON.stringify(user));

    // Let's publish the now updated record
    userSubject.next(user);
  }
}

// Private and non-reserved _delete function
// It deletes the record of the user
async function _delete(id) {
  await fetchWrapper.delete(`${baseURL}/${id}`, {});

  // If the user logged in is the one deleting
  // its record, the we need to log him out
  if (id === userSubject.value.id) {
    logout();
  }
}

async function accessProfile(){
  Router.push("/users/account/profile", "/@me/profile")
}


// -----------------------------------------------------
//
// The variables declaration area
const { publicRuntimeConfig } = getConfig();
const baseURL = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')));
var userHasBeenLoggedOut = false;

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  get isLoggedOut() {
    return userHasBeenLoggedOut;
  },
  accessProfile,
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

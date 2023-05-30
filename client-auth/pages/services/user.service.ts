// The import area

import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "../../helpers";
import { alertService } from "./alert.service";

// The function definition area
async function login(username: String, password: String) {
  const user = await fetchWrapper.post(`${baseURL}/authenticate`, {username, password});

  // publish user to subscribers and store in local storage to stay logged in between page refreshes
  userSubject.next(user);
  localStorage.setItem('user', JSON.stringify(user));
}

async function logout(){
  // Let's clear our previous notifications
  alertService.clear();

  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('user');
  userSubject.next(null);
  Router.push('/account/login');
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

// The variables declaration area
const { publicRuntimeConfig } = getConfig();
const baseURL = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')));

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value
  },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

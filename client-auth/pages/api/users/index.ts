import getConfig from "next/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../db";

// Functions
async function authenticate({
  username, password
}) {
  console.log("DB.User", db.User);
  const user = await db.User.scope("withHash").findOne({
    where: {
      username
    }
  });

  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw "Username or password is incorrect";
  }

  // Create a JSON Web Token with a validity of 2 days
  const token = jwt.sign({
    sub: user.id
  },
  serverRuntimeConfig.secret,
  {
    expiresIn: "2d",
  })

  // Remove the hash from the returned value
  const userJSON = user.get();
  delete userJSON.hash;

  // Now we can return the user and the JWT
  return {
    ...userJSON,
    token
  };
}


async function getAll() {
  // The API call to return all the registered
  // users
  return await db.User.findAll();
}

async function getById(id) {
  // The API call to return only one user
  // using its ID
  return await db.User.findByPk(id);
}

async function create(parameters) {
  // validate the availability of the request username
  console.log("LOG:", db, db.User);
  if (await db.User.findOne({
    where: {
      username: parameters.username
    }
  })) {
    throw 'Username "' + parameters.username + '" is not available';
  }

  const user = new db.User(parameters);

  // Let's hash the given password
  // IT SHOULD NEVER BE IN CLEAR
  if (parameters.password) {
    user.hash = bcrypt.hashSync(parameters.password, 10)
  }

  // Let's save the user
  await user.save();
}

async function update(id, parameters) {
  // Find the user by its ID
  const user = await db.User.findByPk(id);

  // Check the availability of the given user
  if (!user) throw "User not found";
  if (user.username !== parameters.username && await db.User.findOne({
    where: {
      username: parameters.username
    }
  })) {
    throw 'Username "' + parameters.username + '" is not available';
  }

  // Let's hash the password, if it's to be updated
  if (parameters.password) {
    parameters.hash = bcrypt.hashSync(parameters.password, 10)
  }

  // Copy parameters properties to the user
  // We won't do any more operations on them
  Object.assign(user, parameters)

  // Save the user
  await user.save();
}

async function _delete(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";

  // Delete the requested user
  await user.destroy();
}

// Variables declaration
const { serverRuntimeConfig } = getConfig();

export const usersRepo = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
}

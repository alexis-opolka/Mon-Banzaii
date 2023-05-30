import getConfig from "next/config";
import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";

// Functions
async function initialize() {
  // This function initializes the database (DB) and the required
  // models, it's automatically called on the first API request
  // from the `api-handlers.ts` file

  // Let's check if the DB already exists, if not then create it
  // from scratch
  const { host, port, database, user, password } = serverRuntimeConfig.env;
  const connection = await mysql.createConnection({host, port, user, password});
  await createDatabaseFromScratch();

  // Now that we are sure to have a functional DB,
  // we open a new connection
  const sequelize = new Sequelize(database, user, password, {dialect: "mysql"});

  // Now that we have established a connection
  // let's init those models and add them to the exported
  // DB Object
  db.User = userModel(sequelize);

  // We need to synchronize the models with the database
  await sequelize.sync({
    alter: true
  })

  // All our tasks are done, set the initialized attribute
  // to true.
  db.initialized = true;
}

function userModel(sequelize) {
  // This function creates the DB model for the User objects
  const attributes = {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {},
    firstName: {},
    lastName: {}
  };

  const options = {
    defaultScope: {
      attributes : {
        exclude: ['hash'],
      }
    },
    scopes: {
      withHash: {
        attributes: {},
      }
    }
  };
}

async function createDatabaseFromScratch() {
  // this function is required to create the Database from
  // scratch if the DB is missing.
  // It should handle the reading of the configuration file
  // in SQL and handle the different calls to be sent
  // to the engine in order to set up correctly the DB
  // and its tables.
  //
  // TODO: createDatabseFromScratch function
}

// Variables declaration
const { serverRuntimeConfig } = getConfig();

export const db = {
  initialized: false,
  initialize
}

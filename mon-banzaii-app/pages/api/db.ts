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
  console.log("(Server)[API | /db:initialize]: LOG - Initialize called!");
  const { host, port, database, user, password } = serverRuntimeConfig.env;
  const connection = await mysql.createConnection({host, port, user, password});
  await createDatabaseFromScratch(connection, database);

  // Now that we are sure to have a functional DB,
  // we open a new connection
  const sequelize: Sequelize = new Sequelize(database, user, password, {dialect: "mysql"});

  // Now that we have established a connection
  // let's init those models and add them to the exported
  // DB Object
  // db.User = userModel(sequelize);
  db.User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hash'],
      }
    },
    scopes: {
      withHash: {
        attributes: {
          exclude: []
        },
      }
    }
  })
  console.log("db.User:", db.User);

  // We need to synchronize the models with the database
  await sequelize.sync({
    alter: true
  })

  // All our tasks are done, set the initialized attribute
  // to true.
  db.initialized = true;
}

async function createDatabaseFromScratch(connection, database) {
  // this function is required to create the Database from
  // scratch if the DB is missing.
  // It should handle the reading of the configuration file
  // in SQL and handle the different calls to be sent
  // to the engine in order to set up correctly the DB
  // and its tables.
  //
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
}

// Variables declaration
const { serverRuntimeConfig } = getConfig();

export var db = {
  initialized: false,
  initialize: initialize,
  User: null,
};

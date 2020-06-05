"use strict";
require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Mongoose = require("mongoose");
const Path = require("path");

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

Mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const init = async () => {
  await server.register({
    plugin: require("hapi-auth-keycloak"),
  });
  server.auth.strategy("keycloak-jwt", "keycloak-jwt", {
    realmUrl: process.env.REALM_URL,
    clientId: "back",
    minTimeBetweenJwksRequests: 15,
    cache: true,
    userInfo: ["profile", "email", "user"],
  });
  await server.register({
    plugin: require("hapi-auto-route"),
    options: {
      routes_dir: Path.join(__dirname, "routes"),
      pattern: "**/!(_)*.js",
    },
  });
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

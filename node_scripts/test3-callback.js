"use strict";

const MongoClient = require("mongodb").MongoClient;

let users = [
  {
    name: "John",
    email: "john@localhost",
  },
  {
    name: "Jane",
    email: "jane@localhost",
  },
];

let dbUsername = "cs5220stu31";
let dbPassword = "abcd";
let dbUrl = `mongodb://${dbUsername}:${dbPassword}@localhost:4042/${dbUsername}`;

MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
  let db = client.db("cs5220stu31");
  db.collection("users", {}, (err, collection) => {
    collection.insertMany(users, (err, result) => {
      client.close((err) => console.log("connection closed"));
    });
  });
});

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

async function run() {
  let client = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
  let db = client.db("cs5220stu31");
  let collection = await db.collection("users");
  await collection.insertMany(users);
  await client.close();
}

run();

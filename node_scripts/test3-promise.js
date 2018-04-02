'use strict';

const MongoClient = require('mongodb').MongoClient;

let users = [{
    name: 'John',
    email: 'john@localhost'
  },
  {
    name: 'Jane',
    email: 'jane@localhost'
  }
];

async function run() {
  let client = await MongoClient.connect('mongodb://localhost');
  let db = client.db('test3');
  let collection = db.collection('users');
  let result = await collection.remove({});
  result = await collection.insert(users);
  result = await client.close();
}

run();

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

MongoClient.connect('mongodb://localhost', (err, client) => {
  let db = client.db('test3');
  let collection = db.collection('users');
  collection.remove({}, (err, result) => {
    collection.insert(users, (err, result) => {
      client.close();
    });
  });
});

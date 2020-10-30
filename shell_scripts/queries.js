/**
 * This is a Mongo Shell script. Run it with Mongo shell on command line:
 *     mongo queries.js
 * or inside Mongo shell: load('queries.js')
 */
db = connect('localhost:4042/cs5220stu31');

db.auth("cs5220stu31", "abcd");

// List all users

results = db.users.find();

results = db.users.find({});

// List the first name of all users

results = db.users.find({}, {
  firstName: true
});

results = db.users.find({}, {
  firstName: true,
  _id: false
});

// Find the users whose last name is Doe

results = db.users.find({
  lastName: {
    $eq: 'Doe'
  }
});

results = db.users.find({
  lastName: 'Doe'
});

// Find the users whose first name is John and last name is Doe

results = db.users.find({
  $and: [{
      firstName: 'John'
    },
    {
      lastName: 'Doe'
    }
  ]
});

results = db.users.find({
  firstName: 'John',
  lastName: 'Doe'
});

// Find the users whose first name is John or last name is Doe

results = db.users.find({
  $or: [{
    firstName: 'John'
  }, {
    lastName: 'Doe'
  }]
});

// Find the users whose first name is John or first name is Jane and last name is Doe

results = db.users.find({
  $or: [{
    firstName: 'John'
  }, {
    $and: [{
        firstName: 'Jane'
      },
      {
        lastName: 'Doe'
      }
    ]
  }]
});

results = db.users.find({
  $or: [{
    firstName: 'John'
  }, {
    firstName: 'Jane',
    lastName: 'Doe'
  }]
});


// Find the articles whose tags contain 'NoSQL'

results = db.articles.find({
  tags: 'NoSQL'
});

results = db.articles.find({
  tags: {
    $all: ['NoSQL']
  }
});

// Find the articles John Doe has commented on

results = db.articles.find({
  'comments.author.firstName': 'John',
  'comments.author.lastName': 'Doe'
});

// List the articles with their authors (i.e. not just author id)

results = db.articles.aggregate({
  $lookup: {
    from: 'users',
    localField: 'authorId',
    foreignField: '_id',
    as: 'author'
  }
});

// List the article authors

results = db.articles.aggregate([{
  $lookup: {
    from: 'users',
    localField: 'authorId',
    foreignField: '_id',
    as: 'author'
  }
}, {
  $project: {
    author: true
  }
}]);

// Text search for "MongoDB" in articles

results = db.articles.find({ $text: { $search: "mongodb" } });

/* helper function used for output */

function printAll(cursor) {
  while (cursor.hasNext()) {
    printjson(cursor.next());
  }
}

printAll(results);

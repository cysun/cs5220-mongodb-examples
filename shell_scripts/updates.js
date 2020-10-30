/**
 * This is a Mongo Shell script. Run it with Mongo shell on command line:
 *     mongo queries.js
 * or inside Mongo shell: load('updates.js')
 */
db = connect('localhost:4042/cs5220stu31');

db.auth("cs5220stu31", "abcd");

// Change John Doe's name to Tom Smith

db.users.update({
  firstName: 'John',
  lastName: 'Doe'
}, {
  firstName: 'Tom',
  lastName: 'Smith'
});

// Delete the article "Using MongoDB"

db.articles.remove({
  title: 'Using MongoDB'
});

// Add a tag "Tutorial" to the article "Programming Node.js"

db.articles.update({
  title: 'Programming Node.js'
}, {
  $push: {
    tags: 'Tutorial'
  }
});

// Delete the comments made by John Doe

db.articles.update({
  title: 'Programming Node.js'
}, {
  $pull: {
    comments: {
      'author.firstName': 'John',
      'author.lastName': 'Doe'
    }
  }
});

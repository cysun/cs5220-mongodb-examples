/**
 * This is a Mongo Shell script. Run it with Mongo shell on command line:
 *     mongo queries.js
 * or inside Mongo shell: load('queries.js')
 */
db = connect('localhost/blogs');

// 1. List all users

results = db.users.find();

results = db.users.find({});

// 2. List the first name of all users

results = db.users.find({}, {
    firstName: true,
    _id: false
});

// 3. Find the users whose last name is Doe

results = db.users.find({
    lastName: 'Doe'
});

results = db.users.find({
    lastName: {
        $eq: 'Doe'
    }
});

// 4. Find the users whose first name is John and last name is Doe

results = db.users.find({
    firstName: 'John',
    lastName: 'Doe'
});

// 5. Find the users whose first name is John or last name is Doe

results = db.users.find({
    $or: [{
        firstName: 'John'
    }, {
        lastName: 'Doe'
    }]
});

// 6. Find the users whose first name is John or first name is Jane and last name is Doe

results = db.users.find({
    $or: [{
        firstName: 'John'
    }, {
        firstName: 'Jane',
        lastName: 'Doe'
    }]
});

// 7. Find the articles published in March 2017

results = db.articles.find({
    date: {
        $gte: new Date(2017,2,0),
        $lt: new Date(2017,3,0)
    }
});

// 8. Find the articles whose tags contain 'NoSQL'

results = db.articles.find({
    tags: {
        $all: ['NoSQL']
    }
});

// 9. Find the articles John Doe has commented on

results = db.articles.find({
    'comments.author.firstName': 'Jane',
    'comments.author.lastName': 'Doe'
});

// helper function used for output
function printAll(cursor) {
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

printAll(results);

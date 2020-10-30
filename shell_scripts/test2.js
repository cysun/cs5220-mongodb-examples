/**
 * This is a Mongo Shell script. Run it with Mongo shell on command line:
 *     mongo test2.js
 * or inside Mongo shell: load('test2.js')
 */
db = connect('localhost:4042/cs5220stu31');

db.auth("cs5220stu31", "abcd");

print('Connected to database: cs5220stu31');


// drop the users collection if it already exists
db.users.drop();

// insert two new users

user1 = {
    name: 'John',
    email: 'john@localhost'
};

user2 = {
    name: 'Jane',
    email: 'jane@localhost'
};

db.users.insert(user1);
db.users.insert(user2);

// list all the users

cursor = db.users.find();
while (cursor.hasNext()) {
    printjson(cursor.next());
}

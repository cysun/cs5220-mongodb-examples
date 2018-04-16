const mongoose = require('mongoose');
const User = require('./models/user');
const Article = require('./models/article');

async function run() {
  await mongoose.connect('mongodb://localhost/blogs');

  // delete all users with email 'tsmith@localhost'
  await User.deleteMany({
    email: 'tsmith@localhost'
  });

  // insert a new user
  let user = new User({
    firstName: 'Tom',
    lastName: 'Smith',
    email: 'tom@localhost'
  });
  user = await user.save();
  console.log(user);

  // change email to 'tsmith@localhost'
  await User.findOneAndUpdate({
    email: 'tom@localhost'
  }, {
    email: 'tsmith@localhost'
  });

  // search users
  let users = await User.find();
  users.forEach(user => console.log(user));

  // search user using the static method defined in user schema
  user = await User.findByEmail('jdoe2@localhost');
  console.log(user.name());

  // search articles
  let articles = await Article.find().populate('author');
  console.log(articles);

  await mongoose.disconnect();
}

run();

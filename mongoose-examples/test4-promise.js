const mongoose = require('mongoose');

// Create a schema, a model, and a new object

let userSchema = mongoose.Schema({
  name: String,
  email: String
});

let User = mongoose.model('User', userSchema);

let user = new User({
  name: 'John Doe',
  email: 'jdoe@localhost'
});

// Attach connection event handlers

mongoose.connection.on('connected', () => console.log('Mongoose connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose disconnected."));

// Using Promise

async function run() {
  await mongoose.connect('mongodb://localhost/test4');

  await User.remove();
  console.log('All users removed.');

  let savedUser = await user.save();
  console.log(`New user saved: ${savedUser._id}.`);

  await mongoose.disconnect();
}

run();

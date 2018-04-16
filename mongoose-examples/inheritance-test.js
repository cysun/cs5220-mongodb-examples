const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: String
});

const Student = User.discriminator('Student', new mongoose.Schema({
  cin: String
}));

async function run() {
  await mongoose.connect('mongodb://localhost/inheritance-test');

  await User.remove();
  await Student.remove();

  let user = new User({
    name: 'John'
  });
  let student = new Student({
    name: 'Jane',
    cin: '1234'
  });
  await user.save();
  await student.save();

  let users = await User.find();
  console.log(users);

  let students = await Student.find();
  console.log(students);

  await mongoose.disconnect();
}

run();

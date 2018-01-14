// This is the API model for users.
import mongoose from "mongoose";

let userSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  userName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rumBalance: {
    type: String,
    required: false
  },
  ownedShare: {
    type: String,
    required: false
  },
})

let User = module.exports = mongoose.model('userSchema', userSchema);
//Post user
module.exports.createUser = (user, callback) => {
  let userInstance = new User(user);
  userInstance.userName = user.userName;
  userInstance.firstName = user.firstName;
  userInstance.lastName = user.lastName;
  userInstance.email = user.email;
  userInstance.password = user.password;
  userInstance.rumBalance = user.rumBalance;
  userInstance.save(user, callback);
}

//Login user
module.exports.loginUser = (callback, limit) => {
  //login a user here
}

//Logout user
module.exports.logoutUser = (callback, limit) => {
  //logout a user here
}

//Get a specific user
module.exports.getUser = (callback, limit) => {
  //get a specific user here.
}

//Get a specific user
module.exports.getAllUsers = (callback) => {
  console.log('here')
  User.find(callback);
}

//Put a specific user
module.exports.updateUser = (callback, limit) => {
  //update a specific user here.
}

//Delete a specific user
module.exports.deleteUser = (callback, limit) => {
  //delete a specific user here.
}

const { default: mongoose, Schema } = require('mongoose');
const validator = require('validator');


const GENDER = ['male', 'female'];

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error(`Invalid Email: ${value}`);
      },
    },
    fullname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: 'https://i.pravatar.cc/150',
    },
    status: {
      type: Number,
    },
    requestJoinsServer: {
      type: [Schema.Types.ObjectId],
      ref: 'Server',
      default: [],
    },
  },
  {
    collection: 'users',
    timestamps: true,
    strict: true,
  },
);


const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;

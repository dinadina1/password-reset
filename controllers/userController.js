// require mongodb
const { MongoClient, ObjectId } = require("mongodb");

// require env variables from ./config
const { MONGODB_URI, SECRET_KEY } = require("../utilities/config");

// require bcrypt
const bcrypt = require("bcrypt");

// require nodemailer
const nodemailer = require("nodemailer");

// require jsonwebtoken
const jwt = require("jsonwebtoken");

// Creating database connection
const client = new MongoClient(MONGODB_URI);

// create userController object
const userController = {

  // get all users
  getUser: async (req, res) => {
    try {
      // connect to database
      await client.connect();

      // get the database
      const DB = client.db("Guvi_Task");

      // get the collection
      const collection = DB.collection("users");

      // check if user already exists
      const user = await collection.findOne({ _id: new ObjectId(req.user.id) });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return the user
      return res.status(200).json(user);
    } 
    catch (err) {
      return res.status(500).json({ message: err.message });
    } 
    finally {
      // close the database connection
      await client.close();
    }
  },

  // register function
  register: async (req, res) => {
    try {
      // connect to database
      await client.connect();

      // get the database
      const DB = client.db("Guvi_Task");

      // get the collection
      const collection = DB.collection("users");

      // check if user already exist
      const user = await collection.findOne({ email: req.body.email });
      if (user) {
        return res.status(404).json({ message: "User already exist" });
      }

      //   to hash password
      req.body.password = await bcrypt.hash(req.body.password, 10);

      // insert new user data
      const insertUser = await collection.insertOne(req.body);

      //   check if user is inserted
      if (insertUser) {
        return res
          .status(200)
          .json({ message: "User Registered Successfully" });
      } else {
        return res.status(404).json({ message: "Something went wrong" });
      }
    } 
    catch (err) {
      // return error message if error occurs
      return res.status(500).json({ message: err.message });
    } 
    finally {
      // close the database connection
      await client.close();
    }
  },

  // login function
  login: async (req, res) => {
    try {
      // connect to database
      await client.connect();

      // get the database
      const DB = client.db("Guvi_Task");

      // get the collection
      const collection = DB.collection("users");

      // check if user already exist
      const user = await collection.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      //   Compare hash password
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!checkPassword) {
        return res.status(404).json({ message: "Incorrect password" });
      }

      // Generate jsonwebtoken
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        SECRET_KEY,
        { expiresIn: "2d" }
      );

      return res.status(200).json({ message: "Login Successfully", token });
    } 
    catch (err) {
      // return error message if error occurs
      return res.status(500).json({ message: err.message });
    } 
    finally {
      // close database connection
      await client.close();
    }
  },


  logout: async (req, res) => {
    try {

      res.status(200).json({ message: "Logout Successfully" });
    } catch (err) {
      // return error message if error occurs
      return res.status(500).json({ message: err.message });
    }
  },

  // forgot password
  forgotPassword: async (req, res) => {
    try {
      // connect to database
      await client.connect();

      // get the database
      const DB = client.db("Guvi_Task");

      // get the collection
      const collection = DB.collection("users");

      // get user data
      const user = await collection.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate random string
      const randomString =
        Math.random().toString(36).substring(2, 5) +
        Math.random().toString(36).substring(2, 5);

      const expiresIn = Date.now() + 300000; // 5 minutes

      // send password reset mail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dinad9355@gmail.com",
          pass: "zvrmnumrpbmenvdr",
        },
      });

      // create message
      const message = {
        from: "dinad9355@gmail.com",
        to: user.email,
        subject: "Password Reset",
        text: `Your password reset code is ${randomString}`,
      };

      // send mail
      transporter.sendMail(message, (err, info) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
      });

      // update password reset code in database
      await collection.updateOne(
        { _id: user._id },
        {
          $set: {
            passwordResetCode: randomString,
            passwordResetExpiresIn: expiresIn,
          },
        }
      );
      return res
        .status(200)
        .json({ message: "Password reset code sent to your email" });
    } 
    catch (err) {
      // return error message if error occurs
      return res.status(500).json({ message: err.message });
    } 
    finally {
      // close database connection
      await client.close();
    }
  },

  // reset password
  resetPassword: async (req, res) => {
    try {
      // connect to database
      await client.connect();

      // get the database
      const DB = client.db("Guvi_Task");

      // get the collection
      const collection = DB.collection("users");

      // get user data
      const user = await collection.findOne({
        passwordResetCode: req.body.passwordResetCode,
        passwordResetExpiresIn: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(404).json({ message: "Invalid Token" });
      }

      // hash password
      const hashPassword = await bcrypt.hash(req.body.newPassword, 10);

      // update password in database
      const newPassword = {
        password: hashPassword,
        passwordResetCode: null,
        passwordResetExpiresIn: null,
      };
      const updatePassword = await collection.updateOne(
        { _id: user._id },
        { $set: newPassword }
      );

      // check if password is updated
      if (!updatePassword) {
        return res.status(404).json({ message: "Something went wrong" });
      }
      return res.status(200).json({ message: "Password reset successfully" });
    } 
    catch (err) {
      // return error message if error occurs
      return res.status(500).json({ message: err.message });
    } 
    finally {
      // close database connection
      await client.close();
    }
  },
};

module.exports = userController;

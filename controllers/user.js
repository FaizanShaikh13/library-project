const { User } = require("../models");
const bcrypt = require("bcrypt");
const GM = require("../utils/genericMethod");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, name, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      let user = await User.create({
        email,
        name,
        password: hashedPassword,
        role,
      });
      return res.status(201).json({ msg: `User with ${user.email} created` });
    } else {
      res.json({ msg: "user with this email already exists" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ where: { email } });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user_id: user.id }, process.env.TOKEN_KEY, {});

      res.json({
        success: true,
        msg: "Login successful",
        email,
        token,
        username: user.username,
        role: user.role,
      });
    } else {
      res.json({
        success: false,
        msg: "Wrong password",
      });
    }
  } else {
    res.json({
      success: false,
      msg: `user with ${email} does not exists`,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const query = {
      attributes: ["id", "email", "name", "role"],
    };
    return GM.getall(req, res, User, query);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const query = {
      attributes: ["id", "email", "name", "role"],
    };
    return GM.getone(req, res, User, query);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    return GM.delete(req, res, User);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    return GM.update(req, res, User);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login
};

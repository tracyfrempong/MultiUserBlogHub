import Users from '../db/models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = 10;
const jwtSecret = process.env.SECRET_TOKEN;

// register new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, profile_image, bio } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await Users.create({ username, email, password: hashedPassword, profile_image, bio });
    // const newUser = await Users.create({ username, email, password, profile_image, bio });

    res.status(201).json(newUser);
    console.log(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Users.findByPk(userId);

    // Check if user exists
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update user profile
export const updateUserProfile = async (req, res) => {
    try {
      const userId = req.params.id;
      const { username, email, profile_image, bio } = req.body;

      const user = await Users.findByPk(userId);

      // Check if user exists
      if (user) {
        user.username = username || user.username;
        user.email = email || user.email;
        user.profile_image = profile_image || user.profile_image;
        user.bio = bio || user.bio;
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // delete user account
  export const deleteUserProfile = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await Users.findByPk(userId);

      // Check if user exists
      if (user) {
        await user.destroy();
        res.status(200).json({ message: 'User account deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

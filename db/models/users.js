import { STRING } from "sequelize";
import sequelize from "../config/database.js";

const Users = sequelize.define("users", {
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  profile_image: {
    type: STRING,
    allowNull: true,
  },
  bio: {
    type: STRING,
    allowNull: true,
  },
});

export default Users;

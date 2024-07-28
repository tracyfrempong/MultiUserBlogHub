import { STRING, BOOLEAN, TEXT } from "sequelize";
import sequelize from "../config/db_config.js";
import Users from "./users.js";
import Categories from "./categories.js";

const Posts = sequelize.define("posts", {
  title: {
    type: STRING,
    allowNull: false,
  },
  content: {
    type: TEXT,
    allowNull: false,
  },
  post_image: {
    type: STRING,
    allowNull: true,
  },
  published: {
    type: BOOLEAN,
    allowNull: false,
  },
});

// Define relationships
Users.hasMany(Posts);
Posts.belongsTo(Users, { foreignKey: "userId", as: "user" });

Categories.hasMany(Posts);
Posts.belongsTo(Categories, { foreignKey: "categoryId", as: "category" });

export default Posts;

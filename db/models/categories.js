import { STRING } from "sequelize";
import sequelize from "../config/db_config.js";

const Categories = sequelize.define("categories", {
  category_name: {
    type: STRING,
    allowNull: false,
  },
  category_description: {
    type: STRING,
    allowNull: true,
  },
});

export default Categories;

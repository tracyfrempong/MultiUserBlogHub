import sequelize from "./config/database.js";
import Users from "./models/users.js";
import Categories from "./models/categories.js";
import Posts from "./models/posts.js";

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Forcibly create tables (uncomment if needed)
    // await sequelize.sync({ force: true });
    // console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.error("Error details:", error.message);
  }
};

// Connect to the database
connect();

export { Users, Posts, Categories };

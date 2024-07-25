import {
  Sequelize,
  STRING,
  BOOLEAN,
  INTEGER,
  TEXT,
  DATE,
} from "sequelize";

const sequelize = new Sequelize("multiuser_blog", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    port: 8889,
    define: {
        timestamps: true,
    },
});

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

const Posts = sequelize.define("posts", {
  user_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "user_id",
    },
  },
  category_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Categories,
      key: "category_id",
    },
  },
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


// Connect the Users and Posts tables
const User_Posts = sequelize.define("user_posts", {
  user_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "user_id",
    },
  },
  post_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Posts,
      key: "post_id",
    },
  },
});


// Relationships
/** For code clean code sake have relationships seperate **/

// Create tables
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Forcibly create tables
    // await sequelize.sync({ force: true });
    // console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.error("Error details:", error.message);
  }
};

// Connect to the database
connect();

export { Users, Posts, Categories, User_Posts };

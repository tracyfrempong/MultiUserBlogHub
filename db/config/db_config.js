import { Sequelize } from "sequelize";

const sequelize = new Sequelize("multiuser_blog", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 8889,
  define: {
    timestamps: true,
  },
});

export default sequelize;

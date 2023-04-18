import { Sequelize } from "sequelize";
import {AssociateUserPost, PostFactory} from "./post.js";
import {UserFactory} from "./users.js";

const dbName = 'postDB';
const username = 'root';
const password = 'root';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

console.log("API started successfully!")

PostFactory(sequelize);
UserFactory(sequelize);
AssociateUserPost();


export const db = sequelize;
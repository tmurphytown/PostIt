import {Sequelize} from "sequelize";
import { DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import {User} from "./users.js";

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>>{
    declare postId: number;
    declare post: string;
    declare userName: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function PostFactory(sequelize: Sequelize) {
    Post.init({
        postId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        post: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'posts',
        sequelize
    });

}

export function AssociateUserPost() {
    User.hasMany(Post, { foreignKey: 'userID' });
    Post.belongsTo(User, {foreignKey: 'userID'});
}
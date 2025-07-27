import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../Config/Sequelize";

class Comments extends Model {
    public id!: number;
    public postId!: string;
    public comment!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Comments.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        postId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: sequelize as Sequelize,
        tableName: "Comments",
    }
);

export default Comments;

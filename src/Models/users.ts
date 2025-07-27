import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../Config/Sequelize';

class User extends Model{
    public id!: number;
    public username!: string;
    public email!: string;
    public image_url?: string;
    public newsletter!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'https://pub-da4dbd6273d846849afa17bbbe263db6.r2.dev/rankr_default_image.png', 
        },
        newsletter: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
    }
);

export default User;
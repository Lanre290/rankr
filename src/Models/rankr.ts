import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/Sequelize';

class Rankr extends Model{
    public id!: string;
    public title!: string;
    public decription?: string;
    public location?: string;
    public is_private?: boolean;
    public person_one_image_url?: string;
    public person_two_image_url?: string;
    public person_one_name?: string;
    public person_two_name?: string;
    public expiresAt?: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Rankr.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '', 
        },
        is_public: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false, 
        },
        person_one_image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        person_two_image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        person_one_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        person_two_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expiresAt: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: Date.now() + 3 * 24 * 60 * 60, // Default to 3 days from now
        }
    },
    {
        sequelize,
        tableName: 'Rankrs',
        timestamps: true,
    }
);

export default Rankr;
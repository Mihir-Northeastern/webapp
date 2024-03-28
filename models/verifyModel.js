export const VerifyModel = (sequelize, DataTypes) => {
    const Verify = sequelize.define('Verify', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate:{
                isEmail: true,
            },
            allowNull: false,
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });

    return Verify;
}

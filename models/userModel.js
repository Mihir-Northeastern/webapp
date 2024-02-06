export const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            readOnly: true,
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            unique: true,
            validate:{
                isEmail: true,
            },
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        createdAt: 'account_created',
        updatedAt: 'account_updated',    
    });
    
    return User;
}

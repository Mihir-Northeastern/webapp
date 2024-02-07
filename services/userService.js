import {User} from "../sequelize.js";

export const getAllUser = async () => {
    const users = await User.findAll({
        attributes: {
            exclude: ['password']
        }
    });

    return users;
}

export const getUserById = async (id) => { 
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ['password']
        }
    });

    return user;
}


export const createUser = async (user) => {
    const newUser = await User.create({
        ...user,
    });

    delete newUser.dataValues.password;
    return newUser;
}

export const updateUser = async (id, user) => {
    const updatedUser = await User.update({
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
    }, {
        where: {
            id: id,
        },
        returning: true,
    });

    delete updatedUser[1][0].dataValues.account_created;
    delete updatedUser[1][0].dataValues.account_updated;

    return updatedUser[1][0];
}
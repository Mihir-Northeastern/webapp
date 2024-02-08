import {User} from '../sequelize.js';
import * as bcrypt from '../authentication/bcrypt.js';


export const getUserById = async (username) => { 
    console.log('-----------------> ', username);
    const user = await User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            username: username,
        }
    });

    delete user.dataValues.password;

    return user;
}


export const createUser = async (user) => {
    user.password = await bcrypt.hashPassword(user.password);
    const newUser = await User.create({
        ...user,
    });

    delete newUser.dataValues.password;
    return newUser;
}

export const updateUser = async (username, user) => {
    if(user.password) user.password = await bcrypt.hashPassword(user.password);
    const updatedUser = await User.update({
       
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
    }, {
        where: {
            username
        },
        returning: true,
    });

    delete updatedUser[1][0].dataValues.account_created;
    delete updatedUser[1][0].dataValues.account_updated;

    return updatedUser[1][0];
}
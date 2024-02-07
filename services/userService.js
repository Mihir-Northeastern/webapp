import {User} from "../sequelize.js";

export const createUser = async (user) => {
    const newUser = await User.create({
        ...user,
    });

    delete newUser.dataValues.password;
    return newUser;
}

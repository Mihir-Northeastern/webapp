import * as bcrypt from "../authentication/bcrypt.js";
import { User } from "../sequelize.js";

export const authUser = async ({username, password}) => {
    let userId = null;
    const returnUser = await User.findOne({
        where: {
            username: username,
        },
    });

    const user = returnUser ? returnUser.dataValues : null;
    
    if(user){
        const match = await bcrypt.comparePassword(password, user.password);
        if(match){
            userId = user.id;
        }
    }

    return userId;
}
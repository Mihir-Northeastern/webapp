import {User} from '../sequelize.js';
import * as bcrypt from '../authentication/bcrypt.js';
import dotenv from 'dotenv';
import {PubSub} from '@google-cloud/pubsub';

dotenv.config();

export const getUserById = async (username) => { 
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

    const payload = {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: newUser.username,
    };

    
    const messageBuffer = Buffer.from(JSON.stringify(payload));

    const pubsub = new PubSub();

    const topicName = 'projects/dev-gcp-414917/topics/verify_email';

    const userCreatedPublisher = pubsub.topic(topicName);

    // Publish the message
    try {
        await userCreatedPublisher.publish(messageBuffer);
        console.log(`Message published for user ID: ${newUser.first_name}`);
    } catch (error) {
        console.error(`Error publishing message to topic: ${error.message}`);
    }

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

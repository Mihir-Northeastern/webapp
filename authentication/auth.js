import {authUser} from '../authentication/authUser.js';

export const auth = async (req, res, next) => {
    try{
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
        if(username && password){
            const user = await authUser({username, password});
            if(user){
                req.user = {username, user};
                res.set({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Accept,Origin',
                    'expires': '-1',
                });
                return next();
            }
        }

        const authHeader = username && password ? {} : { "WWW-Authenticate": 'Basic realm="Access to the staging site", charset="UTF-8"' };
        res.status(401).send();
    }
    catch(err){
        console.error(err.message);
        res.status(400).send();
    }
}

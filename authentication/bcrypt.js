import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password) => { 
    try{
        return await bcrypt.hash(password, saltRounds);
    }catch(err){
        console.error(err.message);
    }
}

export const comparePassword = async (password, hash) => {
    try{
        return await bcrypt.compare(password, hash);
    }catch(err){
        console.error(err.message);
    }
}
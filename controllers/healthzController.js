import { testConnection } from '../services/healthzService.js';
// Testing connection to the database
export const get = async (req, res) => {
    try{
        await testConnection();
        res.status(200).send(); 
    } catch (error) {    
        res.status(503).send();
    }
   
};
import request from 'supertest';
import app from '../app.js';
import btoa from 'btoa';
import { syncdb } from '../sequelize.js';
import { Verify } from '../models/verifyModel.js';


beforeAll(async () => {
    await syncdb();
});

describe('GET /healthz', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/healthz');
        expect(response.statusCode).toBe(200);
    });
});


const userData = {
    first_name: "Narendra",
    last_name: "Makwana",
    username: "makwanamihir5@gmail.com",
    password: "1234" 
};

const base64Credentials = btoa(`${userData.username}:${userData.password}`);

describe('POST /v2/user/', () => {
    it('should create an user', async () => {
      
        const response = await request(app)
            .post('/v2/user/')
            .send(userData);
        expect(response.statusCode).toBe(201);

        // const userFromApi = await request(app)
        // .get('/v2/user/self')
        // .set('Authorization', `Basic ${base64Credentials}`);
        //expect(userFromApi.statusCode).toBe(200);
    }, 10000);
});

describe('PUT /v2/user/self', () => {
    it('should update an user', async () => {
        const updateUser = {
                first_name: "Seema",
        };
        const response = await request(app)
            .put('/v2/user/self')
            .set('Authorization', `Basic ${base64Credentials}`)
            .send(updateUser);
        //expect(response.statusCode).toBe(403);
   
        const userFromApi = await request(app)
        .get('/v2/user/self')
        .set('Authorization', `Basic ${base64Credentials}`);
        //expect(userFromApi.body.first_name).toBe(updateUser.first_name);
    });
});

describe('GET /v2/user/verify', () => {
    it('should verify user credentials', async () => {
        const response = await request(app)
            .get('/v2/user/verify')
            .set('Authorization', `Basic ${base64Credentials}`);
        expect(response.statusCode).toBe(403);
        // Assert other expectations about the verification response
    });
});
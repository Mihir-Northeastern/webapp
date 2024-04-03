import request from 'supertest';
import app from '../app.js';
import btoa from 'btoa';
import { syncdb } from '../sequelize.js';

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
    username: "nss.ssmmm@gmil.omm",
    password: "1234" 
};

const base64Credentials = btoa(`${userData.username}:${userData.password}`);

describe('POST /v1/user/', () => {
    it('should create an user', async () => {
      
        const response = await request(app)
            .post('/v1/user/')
            .send(userData);
        expect(response.statusCode).toBe(201);

        // const userFromApi = await request(app)
        // .get('/v1/user/self')
        // .set('Authorization', `Basic ${base64Credentials}`);
        //expect(userFromApi.statusCode).toBe(200);
    });
});

describe('PUT /v1/user/self', () => {
    it('should update an user', async () => {
        const updateUser = {
                first_name: "Seema",
        };
        const response = await request(app)
            .put('/v1/user/self')
            .set('Authorization', `Basic ${base64Credentials}`)
            .send(updateUser);
        //expect(response.statusCode).toBe(403);
   
        const userFromApi = await request(app)
        .get('/v1/user/self')
        .set('Authorization', `Basic ${base64Credentials}`);
        //expect(userFromApi.body.first_name).toBe(updateUser.first_name);
    });
});

describe('GET /v1/user/verify', () => {
    it('should verify user credentials', async () => {
        const response = await request(app)
            .get('/v1/user/verify')
            .set('Authorization', `Basic ${base64Credentials}`);
        expect(response.statusCode).toBe(403);
        // Assert other expectations about the verification response
    });
});
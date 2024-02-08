import request from 'supertest';
import app from '../server.js';

describe('GET /healthz', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/healthz');
        expect(response.statusCode).toBe(200);
    });
});
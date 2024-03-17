import request from 'supertest';
import app, { closeServer } from '../server.ts';


describe('test all the routes of users', () =>{

    let agent = request.agent(app);

    beforeAll(async () => {
        const user = {
            username: "test",
            password: "pass123"
        };

        await agent
            .post('/api/users/signup')
            .send(user);
    });

    it('return a 302 on signup route', async () => {

        const user = {
            username: "jest",
            password: "pass123"
        }

        const response = await agent.post('/api/users/signup').send(user);

        expect(response.status).toBe(302);
    });

    it('return 302 on signin route', async () =>{

        const user = {
            username: "jest",
            password: "pass123"
        }

        const response =  await agent.post('/api/users/signin').send(user);

        expect(response.status).toBe(302);

    });

    it('return 302 on logout route', async () => {
        const response =  await agent.post('/api/users/signin');
        expect(response.status).toBe(302);

    });

    afterAll(async () => {
        await closeServer();
    });

});
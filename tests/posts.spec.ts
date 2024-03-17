import request from 'supertest';
import app, {closeServer} from '../server.ts';

describe('test all the routes of posts', () => {
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

    it('route /create should return 302 status', async () => {
        const post = {
            title : 'test title',
            content: 'test content',
            category: 'Tech'
        };

        const response = await agent
            .get('/post/create')
            .send(post);

        expect(response.status).toBe(302);
    });

    it('route /view should return 302 status', async () => {
        const response = await agent
            .get('/post/view?postId=1');

        expect(response.status).toBe(302);
    });

    it('route /comment should return 204 status', async () => {
        const comment = {
            content: 'test comment',
            postId: 1
        };

        const response = await agent
            .post('/post/comment')
            .send(comment);

        expect(response.status).toBe(302);
    });

    it('route /like should return 204 status', async () => {
        const like = {
            postId: 1
        };

        const response = await agent
            .post('/post/like')
            .send(like);

        expect(response.status).toBe(302);
    });

    it('route /getAllComments should return 302 status', async () => {
        const response = await agent
            .post('/post/getAllComments?id=1');

        expect(response.status).toBe(302);
    });

    afterAll(async () => {
        await closeServer();
    });

});


import { Request, Response } from "express";
import pool from "../database";

class PostController {
    public async index(req: Request, res: Response) {
        res.render('CreatePost');
    }

    public async create(req: Request, res: Response) {
        const userID = req.user['id'];
        const title = req.body.title;
        const content = req.body.content;

        const newPost = {
            title: title,
            content: content,
            user_id: userID
        }
        try {
            const query = await pool.query('INSERT INTO posts SET ?', [newPost]);
        } catch {
            res.sendStatus(500);
        }

        return res.redirect("/");
    }

    public async view(req: Request, res: Response) {
        try {
            const postId = req.query.postId;
            let query = await pool.query('SELECT * FROM posts WHERE id = ?', [postId]);
            let post = query[0];


            query = await pool.query('SELECT * FROM users WHERE id = ?', [post.user_id]);
            post.author = query[0]['username'];


            query = await pool.query('SELECT comments.id, comments.content, comments.user_id, comments.post_id, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = ? ORDER BY comments.id;', [postId]);

            post.comments = query;

            return res.render('postView', { post: post });
        } catch {
            res.sendStatus(500);
        }

    }

    public async comment(req: Request, res: Response) {
        const comment = req.body.content;
        const userId = req.user['id'];
        const postId = req.body.postId;

        let newComment = {
            content: comment,
            user_id: userId,
            post_id: postId
        };

        try {
            let query = await pool.query('INSERT INTO comments SET ?', [newComment]);
        } catch {
            res.sendStatus(500);
        }
    }
}

export default new PostController;

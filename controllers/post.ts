import { Request, Response } from "express";
import pool from "../database";

class PostController {
    public async index(req: Request, res: Response) {
        res.render('CreatePost');
    }

    public async create(req: Request, res: Response) {
        const userID = req.user['id'];
        const {title, content, category} = req.body;

        const newPost = {
            title: title,
            content: content,
            user_id: userID,
            likes: 0,
            category : category
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
            post.authorId = query[0]['id'];


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
        res.sendStatus(204);
    }

    public async like(req: Request, res: Response){
        const postId = req.body.postId;
        const userId = req.user['id'];
        try{
            const isLiked = await pool.query('SELECT * FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId]);
            if(isLiked && isLiked.length > 0) return res.sendStatus(204);
            await pool.query('UPDATE posts SET likes=likes+1 WHERE id= ?', [postId]);
            await pool.query('INSERT INTO likes SET ?', [{
                user_id: userId,
                post_id: postId
            }]);
        }catch{
            res.sendStatus(500);
        }

        res.sendStatus(204);
        
    }

    public async getAllComments(req: Request, res: Response) {
        const { id } = req.body;
        if (!id) return res.sendStatus(400);
        try {
            const comments = await pool.query(`
                SELECT comments.*, users.username 
                FROM comments 
                JOIN users ON comments.user_id = users.id 
                WHERE comments.post_id = ?`, 
                id
            );
            return res.json(comments);
        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    }
    
}

export default new PostController;

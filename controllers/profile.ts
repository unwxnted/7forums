import { Request, Response } from "express";
import pool from "../database";

class ProfileController {

    async index(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) return res.sendStatus(400);
        try {
            const user = await pool.query('SELECT * FROM users WHERE id = ?', id);
            const posts = await pool.query('SELECT posts.id, posts.title, posts.content, posts.likes, posts.dislikes FROM posts INNER JOIN users ON posts.user_id = users.id WHERE users.id = ?', id);
            return res.render('profile', {user: user[0], posts: posts});
        } catch{
            return res.sendStatus(500);
        }
    }

}

export default new ProfileController;
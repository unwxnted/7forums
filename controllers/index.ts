import { Request, Response } from "express";
import pool from '../database'

declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
    }
}


class IndexController {
    public async index(req: Request, res: Response) {
        if (!req.isAuthenticated()) {
            return res.redirect("/signin");
        }
        let user = await pool.query('select * from users where id = ?', req.user['id']);
        user = user[0];
        const posts = await pool.query('SELECT * FROM posts');
        
        return res.render("index", { posts: posts, user: user});
    }

    public async signup(req: Request, res: Response) {
        res.render("signUp");
    }

    public async signin(req: Request, res: Response){
        res.render("signIn");
    }

}

export default new IndexController();
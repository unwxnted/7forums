import { Request, Response } from "express";
import pool from "../database";

class PostController{
    public async index(req: Request, res: Response){
        if(!req.isAuthenticated()) return res.redirect("/");
        res.render('CreatePost');
    }

    public async create(req: Request, res: Response){
        if(!req.isAuthenticated()) return res.redirect("/");
        const userID = req.user['id'];
        const title = req.body.title;
        const content = req.body.content;

        const newPost = {
            title: title,
            content: content,
            user_id: userID
        }   
        try{
            const query = await pool.query('INSERT INTO posts SET ?', [newPost]);
        }catch{
            res.sendStatus(500);
        }
        
        return res.redirect("/");

    }
}

export default new PostController;
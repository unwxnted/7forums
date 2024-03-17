import { Request, Response } from "express";
import pool from "../database";
import passport from "passport";

class UserController {
    public signUp = passport.authenticate('local.signup', {
        successRedirect: '/',
        failureRedirect: '/signup'
    });
        
    public signIn = async (req: Request, res: Response, next: any) => {
        passport.authenticate('local.signin', {
            successRedirect: '/',
            failureRedirect: '/signin'
        })(req, res, next);
    }

    public logOut = async (req: Request, res: Response, next : any) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            return res.redirect('/signin');
        });
    }
}

export default new UserController();
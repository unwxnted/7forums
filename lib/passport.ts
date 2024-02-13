
import * as helpers from './helpers';
import pool from '../database';

import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';

interface User {
    id: number;
    username: string;
    password: string;
    // otras propiedades si las hay
}


passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    if(!username){
        return done(null, false);
    }

    if(!password){
        return done(null, false);
    }

    const verifyUsername = await pool.query('SELECT * FROM users WHERE USERNAME=?', [username]);

    if(verifyUsername && verifyUsername.length > 0){

        const validPassword = await helpers.matchPassword(password, verifyUsername[0].password);
        if(validPassword){
            done(null, verifyUsername[0]);
        }else{
            done(null, false);
        }
    }else{
        return done(null, false);
    }

}));

passport.use('local.signup', new localStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {


  let newUser = {
    id : Number,
    username: "",
    password: ""
  };

  newUser.username = username;

  if(!username || !password) {
    return done(null, false);
  }
	
  const verify = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

  if(verify && verify.length > 0) {
    return done(null, false);
  }

  newUser.password = await helpers.encryptPassword(password);

  const result = await pool.query('INSERT INTO users SET ? ', [newUser] );
  newUser.id = result.insertId;
  return done(null, newUser);

}));

passport.serializeUser((user : User, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id : number, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});
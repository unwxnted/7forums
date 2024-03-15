import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from 'express-session';
import MySQLStoreModule from 'express-mysql-session';
import database from './keys'
import passport from 'passport';
import "express-session";
import './lib/passport'

import IndexRouter from "./routes/indexRoutes";
import UsersRouter from "./routes/usersRoutes";
import PostRouter from "./routes/postroutes";
import ProfileRouter from "./routes/profileRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

const MySQLStore = MySQLStoreModule(session);
app.use(
    session({
        secret: '57FCDE220A6BDD856906036E7FADF33F8C1E4AB5B980835CA51825A781675CF9D497471C61C547B6594196D0E3DEC6224306589C5F337273EC5FFB4876ED4733',
        resave: false,
        saveUninitialized: false,
        store: new MySQLStore(database),
    })
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.set('views', 'public');

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    app.locals.user = req.user;
    app.locals.notUser = (req.user ? false : true)
    next();
});


app.use("/", IndexRouter);
app.use("/api/users", UsersRouter);
app.use("/post", PostRouter);
app.use("/profile", ProfileRouter);

app.listen(3000, () => {
    console.log(`server on port ${PORT}`);
})
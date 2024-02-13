import bcrypt from 'bcrypt';

export const encryptPassword  = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const matchPassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const isLoggedIn = async (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect('/');
    }

}

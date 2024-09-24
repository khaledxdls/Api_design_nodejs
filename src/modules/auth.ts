import jwt from "jsonwebtoken";
import { env } from "process";
import * as bcrypt from "bcrypt";

export const comparepassword= (password:string,hashedpassword:string)=>{
    return bcrypt.compareSync(password,hashedpassword)

}

export const hashpassword = (password:string)=>{
    return bcrypt.hashSync(password,10)
}
export const createToken = (user: any) => {
const token = jwt.sign({ user}, env.JWT_SECRET);
return token;
}

export const protect = (req: any, res: any, next: any) => {
    const bearer = req.headers.authorization;
    if(!bearer || !bearer.startsWith("Bearer ")){
    return res.status(401).json({ message: "Unauthorized" });
    }
    const token = bearer.split("Bearer ")[1];
    if(!token){
    return res.status(401).json({ message: "Unauthorized" });
    }
    try{
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
    }catch(err){
    return res.status(401).json({ message: "Unauthorized" });
    }

}
import prisma from "../db";
import { comparepassword, createToken, hashpassword } from "../modules/auth";

export const createUser = async (req: any, res: any,next:any) => {
    try {
        const user = await prisma.user.create({ data: { username: req.body.username, password: await hashpassword(req.body.password) } });
        const token = createToken(user);
        res.status(201).json({ token });
    } catch (error) {
        error.type="input";
        next(error);
       
    }
}

export const loginUser = async (req: any, res: any,next:any) => {
    try {
        const user = await prisma.user.findUnique({ where: { username: req.body.username } });
        if (!user || !comparepassword(req.body.password, user.password)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = createToken(user);
        res.status(200).json({ token });
    } catch (error) {
        error.type="auth";
        next();
       
    }
}
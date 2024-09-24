import exp from "constants";
import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createUser, loginUser } from "./handlers/user";
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use("/api",protect,router);
app.post("/user", createUser);
app.post("/login", loginUser);
app.use((err, req, res, next) => {
  if(err.type==="auth"){
    return res.status(401).json({message:"Unauthorized"});
  }else if(err.type==="input"){
    return res.status(400).json({message:"Bad Request",errors:err.errors});
  }else{
    return res.status(500).json({message:"Internal Server Error"});
  }

})

export default app;

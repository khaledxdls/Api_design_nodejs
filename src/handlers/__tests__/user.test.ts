import * as user from "../user";


describe(
    "user handler",
    () => {
        it("should return a user", async () => {
            const req={
                body:{
                    username:"test3",
                    password:"test3"
                }
            }
            const res={
                json(token){
                    console.log(token);
                    expect(token).toBeTruthy();
                } 
            }
         
           await user.createUser(req,res,()=>{});

        });
    }
);
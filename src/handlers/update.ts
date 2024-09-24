import prisma from "../db"


export const getUpdates = async (req, res) => {
    const products =await prisma.product.findMany({where:{userId:req.user.id},include:{Updates:true}});
   const updates = products.reduce((acc,product)=>[...acc,...product.Updates],[]);
    res.json({message:"Updates",errors:[],data :updates});
}
export const getOneUpdate = async (req, res) => {
    const update =await prisma.updates.findUnique({where:{id:req.params.id}});
    if(!update){
        return res.status(404).json({message:"Update not found"});
    }
    res.json({message:"update",errors:[],data :update});
}

export const createUpdate = async (req, res) => {
    const product =await prisma.product.findUnique({where:{id:req.body.productId}});
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
   const update =await prisma.updates.create({data:{title:req.body.title,body:req.body.body,productId:product.id}});
    res.json({message:"Update created",update});
}
export const updateUpdates = async (req, res) => {
 const product =await prisma.product.findMany({where:{userId:req.user.id,Updates:{every:{id:req.params.id}}},include:{Updates:true}});
    if(!product){
        return res.status(404).json({message:"Update not found"});
    }
    const update =await prisma.updates.update({where:{id:req.params.id},data:req.body});
    res.json({message:"Update updated",update});

}
export const deleteUpdates = async (req, res) => {
    const product =await prisma.product.findMany({where:{userId:req.user.id,Updates:{every:{id:req.params.id}}},include:{Updates:true}});
    if(!product){
        return res.status(404).json({message:"Update not found"});
    }
    await prisma.updates.delete({where:{id:req.params.id}});
    res.json({message:"Update deleted"});
}
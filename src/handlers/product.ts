import prisma from "../db"


export const getProducts = async (req, res) => {
    const products =await prisma.product.findMany({where:{userId:req.user.id}});
    res.json({message:"Products",errors:[],data :products});
}
export const getOneProduct = async (req, res) => {
    const product =await prisma.product.findUnique({where:{id:req.params.id}});
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    res.json({message:"Product",errors:[],data :product});
}

export const createProduct = async (req, res,next) => {
    try{
    const id=req.user.user.id;
    const product =await prisma.product.create({data:{name:req.body.name,price:req.body.price,userId:id}});
    res.status(201).json({message:"Product created",product});
    }catch{
        next();
    }
}
export const updateProduct = async (req, res) => {
    const product =await prisma.product.update({where:{id:req.params.id,userId:req.user.id},data:{name:req.body.name,price:req.body.price}});
    res.json({message:"Product updated",product});
}
export const deleteProduct = async (req, res) => {
    const product =await prisma.product.delete({where:{id:req.params.id,userId:req.user.id}});
    res.json({message:"Product deleted",product});
}
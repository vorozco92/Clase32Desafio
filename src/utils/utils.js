import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import UserDTO from "../dto/User.dto.js";
import CONFIG  from "../config/config.js";
import { faker } from "@faker-js/faker";


export const createHash = password=>bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidatePassword =(user,password)=> bcrypt.compareSync(password,user.password);

export const generateToken =(user)=>{
    const token= jwt.sign({user},CONFIG.SECRET_SESSION,{expiresIn:'12h'})
    return token
}

export const authToken=(req,res,next)=>{
    const headerAuth =req.headers.authorization;
    if(!headerAuth) return res.status(401).send({status:"error",error:"No esta autorizado"})
    console.log(headerAuth);
    const token= headerAuth.split(' ')[1];

    jwt.verify(token,CONFIG.SECRET_SESSION,(error,credentials)=>{
        console.log(error);
        if(error)  return res.status(401).send({status:"error",error:"No esta autorizado"})
        req.user = UserDTO.getUserInputFromClean(credentials.user);
        next();
    })
}

export const generateProducts=()=>{
    let noProducts = 100;
    let products = [];
    for(let i = 0; i < noProducts; i++){
        products.push(generateProduct());        
    }
    return products;
}

export const generateProduct=()=>{
    return {
        _id : faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.alpha(10),
        price : faker.finance.amount(),
        status: true,
        stock: faker.number.int(10),
        category: faker.commerce.department(),
    };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
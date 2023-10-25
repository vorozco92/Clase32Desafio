import { Router } from "express"
import { generateProducts } from "../../src/utils/utils.js";

const router = Router();


router.get('/register',async(req,res)=>{
    res.render('register');
})

router.get('/login',async(req,res)=>{

    if (req.session.user)
        res.redirect('/api/products')
   res.render('login')
})

router.get('/',(req,res)=>{
    if (!req.session.user)
        res.redirect('/login')
    res.render('profile', {user: req.session.user})
 })

 router.get('/reset',async(req,res)=>{
    res.render('reset')
 })

 router.get('/mockingproducts',async(req,res)=>{
    let products = generateProducts();
    res.send(products)
 })

 export default router;
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants.js';


export function authMiddleware(req, res, next){
      console.log("All headers:", req.headers);

    const authHeader = req.headers.authorization
    console.log("Auth header:", authHeader);

    if(!authHeader){
        return res.status(401).json({error: "No token provided"}) //401 is for unauthorised 
    }

    const token = authHeader.split(" ")[1]
        if (!token){
            return res.status(401).json({error: "Invalid token format"})
        }

        try{
            const decoded = jwt.verify(token, SECRET_KEY)
            req.user = decoded; 
            next()
        }

        catch(ex){
            return res.status(401).json({error: "Invalid or expired token"})
        }
    
}

//request comes in: 
// authorisation header hai? nahi? reject 
// token hai after Bearer? nahi? reject
//token valid hai? nahi? reject 
//agar sab required chize hai toh attach kro user ko req.user se and booking route ke taraf jaao
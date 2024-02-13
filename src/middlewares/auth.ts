// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export interface CustomRequest extends Request {
//   user?: any; 
// }
// const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Token is not valid' });
//   }
// };

// export default auth;


import { Request, Response, NextFunction } from "express";
import { Payload} from "../types/userTypes";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: Payload;
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { user: Payload };
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

export default auth;

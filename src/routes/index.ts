import {Request, Response } from "express";
const express = require('express');
const router = express.Router();
import usersRouter from './users.ts'

// router.get("/", (req: Request,res:Response)=>{
//     res.send("hello world!");
// });

router.get("/", (req: Request,res:Response)=>{
    res.send("inside routes!");
});


router.use("/users", usersRouter);  

export default router;
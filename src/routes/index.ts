import {Request, Response } from "express";
const express = require('express');
const router = express.Router();
import usersRouter from './users.ts'

router.use("/users", usersRouter);  

export default router;

// import express, { Request, Response, Router } from 'express';
// import usersRouter from './users';

// const router: Router = express.Router();

// router.use("/users", usersRouter);

// export default router;


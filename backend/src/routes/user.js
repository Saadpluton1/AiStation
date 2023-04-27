import express from "express";
const router = express.Router();
import { addAllocation, addUser, getAllocationData } from '../controllers/UserController/userController.js'

//Create
router.post("/addUser", addUser);
router.post("/addAllocation", addAllocation);
router.get("/getAllocationData", getAllocationData);


export default router;
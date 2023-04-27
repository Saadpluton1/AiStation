import express from "express";
const router = express.Router();
import { createPresale, getPresale, getPresaleAdmin, swapFunds, updatePresaleStatus, getSaleById } from '../controllers/PresaleController/presaleController.js'

//Create
router.post("/create_presale", createPresale);

//Get
router.get("/getPresale", getPresale)
router.get("/getPresaleAdmin", getPresaleAdmin)
router.get("/getSaleById", getSaleById)

//update
router.post("/updatePresaleStatus", updatePresaleStatus)

//swap 
router.post("/swapFunds", swapFunds)


export default router;
import express from "express";
const router = express.Router();
import { createPresale, getPresale, getPresaleAdmin,deletePresaleAdmin, swapFunds, updatePresaleStatus, getSaleById } from '../controllers/PresaleController/presaleController.js'

//Create
router.post("/create_presale", createPresale);

//Get
router.get("/getPresale", getPresale)
router.get("/getPresaleAdmin", getPresaleAdmin)

router.delete("/getPresaleAdmin/delete/:id", deletePresaleAdmin)
router.get("/getSaleById", getSaleById)

//update
router.post("/updatePresaleStatus", updatePresaleStatus)

//swap 
router.post("/swapFunds", swapFunds)


export default router;
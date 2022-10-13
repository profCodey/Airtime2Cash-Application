import { Router } from "express";
import {twoFaVerify, twoFaGenerate} from "../controller/twoFa"
import { userRequest } from "../types/express";
import { auth } from "../utils/authMiddleware";


const routes = Router()

routes.post("/verify",auth, async(req:userRequest, res) => {
    try {
        const { pin } = req.body;
        const { user_id } = req.user
        const response = await twoFaVerify(pin,user_id)
        console.log(response)
        res.status(200).json({status: response})
    } catch (error) {
        console.log(error)
        return res.status(400).json({Error:error})
    }
})
routes.get("/generate", auth, async(req:userRequest, res) => {
    try {
        const {user_id} =req.user
        const response = await twoFaGenerate(user_id)
        res.status(200).json({response})
    } catch (error) {
        console.log(error)
        return res.status(400).json({Error:error})
    }
})

export default routes
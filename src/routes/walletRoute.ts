import { Router } from "express";
import { cancelTx, updateWallet } from "../controller/walletController";
import { userRequest } from "../types/express";
import { auth } from "../utils/authMiddleware";

const router = Router();

router.patch("/confirm", auth, async (req:userRequest, res) => {
	try {
		const data = req.body;
		const id = req.user.user_id;
		const response = await updateWallet(data, id);
		return res.status(200).json({
			message: "Success",
			response
		})
	} catch (error) {
		console.log(error)
		return res.status(400).json({
			message: error
		})
	}
});
router.patch("/cancel", auth, async (req:userRequest, res) => {
	try {
		const txId = req.body.txId;
		const id = req.user.user_id;
		const response = await cancelTx(txId, id);
		return res.status(200).json({
			message: "Success",
			response
		})
	} catch (error) {
		console.log(error)
		return res.status(400).json({
			message: error
		})
	}
});

export default router;

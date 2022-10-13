import { Router } from "express";
import { createAccount, getAccounts, removeAccount } from "../controller/accountController";
import { userRequest } from "../types/express";
import { auth } from "../utils/authMiddleware";

const routes = Router();

routes.post("/", auth, async (req: userRequest, res) => {
	try {
		const data = req.body;
		const { user_id } = req.user;
		const response = await createAccount(data, user_id);
		return res.status(201).json({ message: "Success", response });
	} catch (error) {
		return res.status(400).json({ Error: error });
	}
});

routes.get("/", auth, async (req: userRequest, res) => {
	try {
		const {user_id} =req.user
		const response = await getAccounts(user_id);
		return res.status(200).json({message: "Success", response})
	} catch (error) {
		return res.status(400).json({Error: error})
	}
})

routes.delete("/:id", auth, async (req:userRequest, res) => {
	console.log("ggg", req.user.user_id)
// 	try {
// 	  console.log("hello, i'm here")
// 	  const id = req.params.id
// 	  const { user_id } = req.user
// 	  console.log(user_id,"idggg")
// 	const password = req.body.password
//     const response = await removeAccount({user_id,password},id);
//     res.status(200).json({message: "Success", response})
//   } catch (error) {
//     return res.status(400).json({ Error: error });
//   }
});


export default routes;

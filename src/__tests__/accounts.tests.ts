// import supertest from "supertest";
// import app from "../app";
// import prisma from "../utils/prismaClient";

// const request = supertest(app);

// const user = {
// 	firstName: "test",
// 	lastName: "test",
// 	userName: "test",
// 	email: "test@mail.com",
// 	phone: "02346678940",
// 	password: "pass",
// 	confirmPassword: "pass"
// }


// //test for creating account
// const account =  await request
// 			.post("/api/accounts").send({
// 			bankName: "Polaris Bank",
// 			accountName: "Demilade Otuns",
// 			accountNumber: "1234567890",
// })
        

// describe("Create account test", () => {
//     it("should create account", async () => {
//         const login = await request
//             .post("/api/users/login").send({
//                 userName: user.userName,
//                 password: user.password,
//             })

//         const token = login.body.response.token;
//         const response = await request.post("/api/accounts")
//             .set('Authorization', 'Bearer ' + token)
//             .send(account);
//         expect(response.status).toBe(201);
//         expect(response.body.message).toBe("Success");
//         expect(response.body).toHaveProperty("response");
//    2
//     });
// });


// // //test for getting account
// // describe("Get accounts test", () => {
// //     it("should get accounts", async () => {
// //         const response = await request.get("/api/accounts");
// //         expect(response.status).toBe(200);
// //         expect(response.body.message).toBe("Success");
// //         expect(response.body).toHaveProperty("response");
// //     });
// // });

// // //test for deleting account
// // describe("Delete account test", () => {
// //     it("should delete account", async () => {
// //         const response = await request.delete("/api/accounts/1");
// //         expect(response.status).toBe(200);
// //         expect(response.body.message).toBe("Success");
// //         expect(response.body).toHaveProperty("response");
// //     });
// // });


// // //test for update wallet balance

// // const wallet = {
// //     amount: "test",
// //     userId: "test",
// // }


// // export async function updateWalletBalance(id: string, amount: number) {
// // 	describe("Update wallet balance test", () => {
// // 		it("should update wallet balance", async () => {
// // 			const response = await request.patch("/api/accounts/wallet").send({ amount, id });
// // 			expect(response.status).toBe(200);
// // 			expect(response.body.message).toBe("Success");
// // 			expect(response.body).toHaveProperty("response");
// // 		});
// // 	});
// // }	


// // //test for withdraw from wallet

// // export async function withdrawFromWallet(id: string, amount: number) {
// //     describe("Withdraw from wallet test", () => {
// //         it("should withdraw from wallet", async () => {
// //             const response = await request.put("/api/accounts/withdraw/successful").send({ amount, id });
// //             expect(response.status).toBe(200);
// //             expect(response.body.message).toBe("Success");
// //             expect(response.body).toHaveProperty("response");
// //         });
// //     });
// // }


// // //test for flutterwave payment
// // export async function flutterwavePayment(id: string, amount: number) {
// //     describe("Flutterwave payment test", () => {
// //         it("should flutterwave payment", async () => {
// //             const response = await request.put(`/api/accounts/${id}`).send({ amount });
// //             expect(response.status).toBe(200);
// //             expect(response.body.message).toBe("Success");
// //             expect(response.body).toHaveProperty("response");
// //         });
// //     });
// // }

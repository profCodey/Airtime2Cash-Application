import { createAccountSchema } from "../utils/validation";
import prisma from "../utils/prismaClient";
import { decryptPassword } from "../utils/hashPassword";

export async function createAccount(
	data: Record<string, unknown>,
	userId: string
) {
	const validData = createAccountSchema.safeParse(data);
	if (!validData.success) throw validData.error;
	const record = validData.data;
	// check for existing account number
	const existingNumber = await prisma.account.findFirst({
		where: { accountNumber: record.accountNumber },
	});
	if (existingNumber) throw "Account Number already exist";

	const response = await prisma.account.create({
		data: {
			bankName: record.bankName,
			accountName: record.accountName,
			accountNumber: record.accountNumber,
			userId: userId,
		},
	});

	return response;
}

export async function getAccounts(id: string) {
	const userAccount = await prisma.account.findMany({
		where: {
			userId: id
		}
	})

	return userAccount
}

export async function removeAccount(data: Record<string, string>, id: string) {
	const user = await prisma.user.findUnique({ where: { id: data.user_id } })
	if (!user) throw "User does not exist";
	const { password } = user;
	if (await decryptPassword(data.password,password)) {
		const response = await prisma.account.delete({ where: { id: id } })
		return response
	}
	throw "Something went wrong"
}

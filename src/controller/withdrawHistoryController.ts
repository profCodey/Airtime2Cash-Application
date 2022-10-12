import { decryptPassword } from "../utils/hashPassword";
import prisma from "../utils/prismaClient";
import { walletBalanceSchema, withdrawHistorySchema } from "../utils/validation"

async function validation(data: Record<string, unknown>, id: string) {
    const validData = walletBalanceSchema.safeParse(data);
    if (!validData.success) {
        throw validData.error;
    }
    const record = validData.data;
    const user = await prisma.user.findFirst({ where: { id } });
    const userPassword = user?.password;
    if (!userPassword) throw 'password not found'
    const match = await decryptPassword(record.password, user.password);
    if (!match) throw "Incorrect password. Access denied";
    const walletBalance = user?.wallet;
    const amount = validData.data.amount;
    return { walletBalance, amount, record }
}

export async function walletBalanceFunc(data: Record<string, unknown>, id: string) {

    const { walletBalance, amount } = await validation(data, id)
    if (!walletBalance || walletBalance < amount) {
        throw `You do not have enough funds`;
    }

    return 'Successful'
}

export async function successHistory(data: Record<string, unknown>, id: string) {

    const { walletBalance, amount, record } = await validation(data, id)
    const newBalance = walletBalance - amount;
    await prisma.withdrawHistory.create({
        data: {
            amount: amount,
            accountNumber: record.accountNumber as string,
            bankName: record.bankName as string,
            userId: id,
            isSuccessful: 'Successful',
        }
    })

    return prisma.user.update({
        where: {
            id,
        },
        data: {
            wallet: newBalance
        },
        select: {
            wallet: true
        },
    });
}

export async function failedHistory(data: Record<string, unknown>, id: string) {

    const { walletBalance, amount, record } = await validation(data, id)
    await prisma.withdrawHistory.create({
        data: {
            amount: amount,
            accountNumber: record.accountNumber as string,
            bankName: record.bankName as string,
            userId: id,
            isSuccessful: 'Failed',
        }
    })

    return walletBalance
}

export async function userWithdrawal(id: string, page: number, limit: number) {
    const toSkip = (0 + page) * limit;
    console.log('withHisCon 76')
    const oneUserWithdrawal = await prisma.withdrawHistory.findMany({
        where: {
            userId: id
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    if (oneUserWithdrawal.length < 1) throw "No withdrawals yet"
    console.log('withHisCon 87')
    return oneUserWithdrawal;
}
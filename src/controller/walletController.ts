import { updateWalletSchema } from "../utils/validation";
import prisma from "../utils/prismaClient";

export async function updateWallet(data: Record<string, unknown>, id: string) {
  const validData = updateWalletSchema.safeParse(data);
  if (!validData.success) {
    throw validData.error;
  }
  const { email, amount, txId, txStatus } = validData.data;
  // validate admin
  const user = await prisma.user.findFirst({ where: { id } });
  if (!user) {
    throw "Cannot update wallet, owner cannot be verified";
  }
  if (user.isAdmin !== true) {
    throw "Access Denied. You are not an admin";
  }

  const confirmMail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!confirmMail) throw "Email not found";
  const txAmount = Number(amount);
  const newBal = confirmMail.wallet + txAmount * 0.7;

  const response = await prisma.user.update({
    where: {
      email,
    },
    data: {
      wallet: newBal,
      txRecord: {
        update: {
          where: {
            id: txId,
          },
          data: {
            status: txStatus,
          },
        },
      },
    },
  });

  return response;
}

export async function cancelTx(txId: string, adminId: string) {
  const isAdmin = await prisma.user.findFirst({
    where: {
      AND: [
        {
          id: adminId,
          isAdmin: true,
        },
      ],
    },
  });
  if (!isAdmin) throw "You're not authorized to perform this operation";
  const response = await prisma.txRecord.update({
    where: { id: txId },
    data: {
      status: "cancelled",
    },
  });
  return response;
}

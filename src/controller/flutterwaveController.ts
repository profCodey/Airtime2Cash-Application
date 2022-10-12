import Flutterwave from "flutterwave-node";

export async function PayFlutter(data: Record<string, unknown>) {
	const flw = new Flutterwave(
		"FLWPUBK_TEST-ab9110a6e892c4d8003972c67262c709-X",
		"FLWSECK_TEST-7b7484a72d3c70d324c71e63d399b879-X",
		true
	);

	const payload = {
		account_bank: data.bankCode as string,
		account_number: data.accountNumber as string,
		amount: data.amount as string,
		narration: "New transfer",
		currency: "NGN",
		reference: "trans-" + Date.now(),
		beneficiary_name: "",
		destination_branch_code: "",
	};

	const response = await flw.Transfer.initiate(payload);
	console.log("RES", response);
	return response;
}

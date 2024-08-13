import { useSQLiteContext } from "expo-sqlite";

export type TransactionType = {
    id: number;
    amount: number;
    account: number;
    category: number;
    type: string;
    date: string;
    details: string;
}


export function useTransactionDb() {

    const sqlite = useSQLiteContext();

    async function create(data: Omit<TransactionType, "id">) {
        console.log(data, "data")
        try {
            // Retrieve the current balance of the account
            const accountResult = await sqlite.getFirstAsync<{ balance: number }>(
                `SELECT balance FROM account WHERE id = $accountId`,
                { $accountId: data.account }
            );
            const currentBalance = accountResult?.balance ?? 0;

            // Calculate the new balance
            const newBalance = data.type === 'INCOME'
                ? currentBalance + data.amount
                : currentBalance - data.amount;

            // Update the account balance
            await sqlite.runAsync(
                `UPDATE account SET balance = $newBalance WHERE id = $accountId`,
                { $newBalance: newBalance, $accountId: data.account }
            );

            // Insert the transaction row
            const result = await sqlite.runAsync(
                `INSERT INTO transactions (amount, account, category, type, date, details) VALUES ($amount, $account, $category, $type, $date, $details)`,
                {
                    $amount: data.amount,
                    $account: data.account,
                    $category: data.category,
                    $type: data.type,
                    $date: data.date,
                    $details: data.details
                }
            );

            const insertedRowId = result.lastInsertRowId.toLocaleString();

            return { insertedRowId };

        } catch (error) {
            throw error;
        }
    }


    async function list() {
        try {
            const query = "SELECT * FROM transaction"

            const response = await sqlite.getAllAsync<TransactionType>(
                query,
                // `%${name}%`
            )

            return response
        } catch (error) {
            throw error
        }
    }




    return { create, list }
}
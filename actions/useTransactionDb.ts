import { useSQLiteContext } from "expo-sqlite";

export type TransactionType = {
    id: number;
    amount: number;
    account: number;
    category: number | null;
    type: string;
    date: string;
    details: string;
}


export function useTransactionDb() {

    const sqlite = useSQLiteContext();

    async function create(data: Omit<TransactionType, "id">) {
        console.log(data, "data");
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
    
            // Check if the new balance would be negative
            if (newBalance < 0) {
                return { error: 'Insufficient funds' };
            }
    
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

    // transfer amount from_account to to_account

    async function transfer(data: { from_account: number, to_account: number, amount: number, date: string }) {
        try {
            // Retrieve the current balance of the from_account
            const fromAccountResult = await sqlite.getFirstAsync<{ balance: number }>(
                `SELECT balance FROM account WHERE id = $accountId`,
                { $accountId: data.from_account }
            );
            const fromAccountBalance = fromAccountResult?.balance ?? 0;

            // Retrieve the current balance of the to_account
            const toAccountResult = await sqlite.getFirstAsync<{ balance: number }>(
                `SELECT balance FROM account WHERE id = $accountId`,
                { $accountId: data.to_account }
            );
            const toAccountBalance = toAccountResult?.balance ?? 0;

            // Check if the from_account has enough balance
            if (fromAccountBalance < data.amount) {
                return { error: 'Insufficient funds' };
            }

            // Calculate the new balances
            const newFromAccountBalance = fromAccountBalance - data.amount;
            const newToAccountBalance = toAccountBalance + data.amount;

            // Update the from_account balance
            await sqlite.runAsync(
                `UPDATE account SET balance = $newBalance WHERE id = $accountId`,
                { $newBalance: newFromAccountBalance, $accountId: data.from_account }
            );

            // Update the to_account balance
            await sqlite.runAsync(
                `UPDATE account SET balance = $newBalance WHERE id = $accountId`,
                { $newBalance: newToAccountBalance, $accountId: data.to_account }
            );

            // Insert the transaction row
            const result = await sqlite.runAsync(
                `INSERT INTO transaction_history (amount, from_account, to_account, date) VALUES ($amount, $fromAccount, $toAccount, $date)`,
                {
                    $amount: data.amount,
                    $fromAccount: data.from_account,
                    $toAccount: data.to_account,
                    $date: data.date
                }
            );

            const insertedRowId = result.lastInsertRowId.toLocaleString();

            return { insertedRowId };

        } catch (error) {
            throw error;
        }
    }


    return { create, list, transfer }
}
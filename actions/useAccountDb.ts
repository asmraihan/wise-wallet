import { useSQLiteContext } from "expo-sqlite";

export type AccountType = {
    id: number;
    name: string;
    balance: number;
}


export function useAccountDb() {

    const sqlite = useSQLiteContext();

    async function list() {
        try {
            const query = "SELECT * FROM account"

            const response = await sqlite.getAllAsync<AccountType>(
                query,
                // `%${name}%`
            )

            return response
        } catch (error) {
            throw error
        }
    }


    async function update(data: Omit<AccountType, "type">) {
        const statement = await sqlite.prepareAsync(
            "UPDATE account SET balance = $balance WHERE id = $id"
        )
        try {
            await statement.executeAsync({
                $id: data.id,
                $balance: data.balance,
            })
            
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }


    return { list, update }
}
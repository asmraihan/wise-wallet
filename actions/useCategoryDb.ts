import { useSQLiteContext } from "expo-sqlite";

export type Category = {
    id: number;
    name: string;
    type: string;
}


export function useCategoryDb() {

    const sqlite = useSQLiteContext();

    async function create(data: Omit<Category, "id">) {

        const statement = await sqlite.prepareAsync(
            `INSERT INTO category (name, type) VALUES ($name, $type)`
        )
        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $type: data.type
            });

            const insertedRowId = result.lastInsertRowId.toLocaleString();

            return { insertedRowId }

        } catch (error) {
            throw error;
        }
    }

    return { create }

}
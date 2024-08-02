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
        } finally {
            await statement.finalizeAsync();
        }
    }


    async function searchByName(name: string) {
        try {
            const query = "SELECT * FROM category WHERE name LIKE ?"

            const response = await sqlite.getAllAsync<Category>(
                query,
                `%${name}%`
            )

            return response
        } catch (error) {
            throw error
        }
    }


    async function update(data: Category) {
        const statement = await sqlite.prepareAsync(
            "UPDATE category SET name = $name, type = $type WHERE id = $id"
        )

        try {
            await statement.executeAsync({
                $id: data.id,
                $name: data.name,
                $type: data.type
            })
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function remove(id: number) {
        try {
            await sqlite.execAsync("DELETE FROM category WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function show(id: number) {
        try {
            const query = "SELECT * FROM category WHERE id = ?"

            const response = await sqlite.getFirstAsync<Category>(query, [
                id,
            ])

            return response
        } catch (error) {
            throw error
        }
    }


    return { create, searchByName, update, remove, show }
}
import { useSQLiteContext } from "expo-sqlite";

export type CategoryType = {
    id: number;
    name: string;
    type: string;
}


export function useCategoryDb() {

    const sqlite = useSQLiteContext();

    async function create(data: Omit<CategoryType, "id">) {
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


    async function searchByName(name?: string, type?: string) {
        try {
            let query = "SELECT * FROM category WHERE 1=1";
            const params: string[] = [];
    
            if (name) {
                query += " AND name LIKE ?";
                params.push(`%${name}%`);
            }
    
            if (type) {
                query += " AND type = ?";
                params.push(type);
            }
    
            const response = await sqlite.getAllAsync<CategoryType>(query, ...params);
    
            return response;
        } catch (error) {
            throw error;
        }
    }


    async function update(data: Omit<CategoryType, "type">) {
        const statement = await sqlite.prepareAsync(
            "UPDATE category SET name = $name WHERE id = $id"
        )

        try {
            await statement.executeAsync({
                $id: data.id,
                $name: data.name,
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

            const response = await sqlite.getFirstAsync<CategoryType>(query, [
                id,
            ])

            return response
        } catch (error) {
            throw error
        }
    }


    return { create, searchByName, update, remove, show }
}
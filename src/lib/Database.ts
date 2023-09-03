import { Pool, PoolClient, QueryResult } from 'pg';
import { ConfigManagement } from './ConfigManagement';
import { IConfiguration } from '../interfaces/IConfiguration';
import { IPostgreSQLConnection } from '../interfaces/IPostgreSQLConnection';

class PostgreSQL {
    private static instance: PostgreSQL | null = null;
    private pool: Pool;
    private postgresql: IPostgreSQLConnection;

    public constructor() {
        const configManagement = new ConfigManagement();
        const config: IConfiguration = configManagement.getConfig();

        this.postgresql = config.postgresql;

        this.pool = new Pool({
            host: this.postgresql.host,
            port: this.postgresql.port,
            user: this.postgresql.user,
            password: this.postgresql.password,
            database: this.postgresql.database,
            ssl: false
        });
    }

    public static getInstance(): PostgreSQL {
        if (PostgreSQL.instance === null) {
            PostgreSQL.instance = new PostgreSQL();
        }
        return PostgreSQL.instance;
    }

    public async query(query: string, values?: any[]): Promise<QueryResult> {
        const client: PoolClient = await this.pool.connect();

        try {
            const result: QueryResult = await client.query(query, values);
            return result;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    public async queryWithCallback(query: string, values: any[], callback: Function) {
        const client: PoolClient = await this.pool.connect();

        try {
            const result: QueryResult = await client.query(query, values);
            callback(result);
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
}

export default PostgreSQL;

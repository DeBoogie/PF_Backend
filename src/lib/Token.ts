import PostgreSQL from "./Database";

class Token {
    private db: PostgreSQL;

    constructor() {
        this.db = PostgreSQL.getInstance();

        // Bindings
        this.verifyToken = this.verifyToken.bind(this);
    }

    public async verifyToken(token: string): Promise<boolean> {
        try {
            const user = await this.db.query('SELECT id FROM users WHERE token = $1', [token]);
            return user.rowCount > 0;
        } catch (error) {
            console.error('Error Verifying Token:', error);
            return false;
        }
    }
}

export default Token;
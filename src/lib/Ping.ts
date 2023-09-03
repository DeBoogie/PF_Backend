import Database from "./Database";

class Ping {

    private db: Database;

    constructor() {
        this.db = Database.getInstance();

        // Bindings
        this.verify = this.verify.bind(this);
    }

    public async verify(token: string) {
        try {
            const result = await this.db.query('SELECT * FROM users WHERE token = $1', [token]);
            return result.rowCount > 0;
        } catch (error) {
            throw error;
        }
    }
}

export default Ping;
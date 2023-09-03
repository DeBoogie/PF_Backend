import { Request, Response } from "express";
import PostgreSQL from "../lib/Database";
import Utilities from "../lib/Utilities";

class UserController {
    private db: PostgreSQL;

    constructor() {
        this.db = PostgreSQL.getInstance();

        // Bindings
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.getUserByToken = this.getUserByToken.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.db.query('SELECT id, username FROM users');
            const respData = Utilities.createResponse(true, 'Listing OK.', users.rows);
            res.status(200).json(respData);
        } catch (error) {
            this.handleError(error);
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const user = await this.db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
            const respData = Utilities.createResponse(true, 'User found.', user.rows);
            res.status(200).json(respData);
        } catch (error) {
            this.handleError(error);
        }
    }

    async getUserByToken(req: Request, res: Response) {
        try {
            const user = await this.db.query('SELECT id, username FROM users WHERE token = $1', [req.params.token]);
            const respData = Utilities.createResponse(true, 'User found.', user.rows);
            res.status(200).json(respData);
        } catch (error) {
            this.handleError(error);
        }
    }

    async signIn(req: Request, res: Response) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const passwordHash = await this.db.query('SELECT password FROM users WHERE username = $1', [username]);
            const passwordMatch = await Utilities.compareHash(password, passwordHash.rows[0].password);

            if (passwordMatch) {
                const token = await Utilities.hashString(passwordHash.rows[0].id + Utilities.generateToken(32));
                await this.db.query('UPDATE users SET token = $1 WHERE username = $2', [token, username]);

                const respData = Utilities.createResponse(true, 'Authentication succeeded.', token);
                res.status(200).json(respData);
            } else {
                const respData = Utilities.createResponse(false, 'User not found.', null);
                res.status(404).json(respData);
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    // Handle Error
    private handleError(error: any) {
        console.error(error);
    }
}

export default UserController;
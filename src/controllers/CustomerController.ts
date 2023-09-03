import { Request, Response } from "express";
import PostgreSQL from "../lib/Database";
import Utilities from "../lib/Utilities";

class CustomerController {
    private db: PostgreSQL;

    constructor() {
        this.db = PostgreSQL.getInstance();

        // Bindings
        this.getAllCustomers = this.getAllCustomers.bind(this);
        this.getCustomerById = this.getCustomerById.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }

    async getAllCustomers(req: Request, res: Response) {
        try {
            const customers = await this.db.query('SELECT * FROM customers');
            const respData = Utilities.createResponse(true, 'Listing OK.', customers.rows);
            res.status(200).json(respData);
        } catch (error) {
            this.handleError(error);
        }
    }

    async getCustomerById(req: Request, res: Response) {
        try {
            const customer = await this.db.query('SELECT * FROM customers WHERE id = $1', [req.params.id]);
            const respData = Utilities.createResponse(true, 'Customer found.', customer.rows);
            res.status(200).json(respData);
        } catch (error) {
            this.handleError(error);
        }
    }

    async createCustomer(req: Request, res: Response) {
        try {
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const email = req.body.email;
            const mobile_phone = req.body.mobile_phone;
            const company = req.body.company;
            const website = req.body.website;

            await this.db.query('INSERT INTO customers (firstname, lastname, email, mobile_phone, company, website) VALUES ($1, $2, $3, $4, $5, $6)', [firstname, lastname, email, mobile_phone, company, website]);
            const respData = Utilities.createResponse(true, 'Customer created.', null);
            res.status(201).json(respData);
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateCustomer(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const email = req.body.email;
            const mobile_phone = req.body.mobile_phone;
            const company = req.body.company;
            const website = req.body.website;

            await this.db.query('UPDATE customers SET firstname = $1, lastname = $2, email = $3, mobile_phone = $4, company = $5, website = $6 WHERE id = $7', [firstname, lastname, email, mobile_phone, company, website, id]);
            const respData = Utilities.createResponse(true, 'Customer updated.', null);
            res.status(200).json(respData);
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteCustomer(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.db.query('DELETE FROM customers WHERE id = $1', [id]);
            const respData = Utilities.createResponse(true, 'Customer deleted.', null);
            res.status(200).json(respData);
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any) {
        console.error(error);
    }
}

export default CustomerController;
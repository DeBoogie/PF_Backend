import express, { Router } from "express";
import CustomerController from "../controllers/CustomerController";
import { RequireAuthentication } from "../lib/RequireAuthentication";

const customerController = new CustomerController();
const customerRouter: Router = express.Router();

customerRouter.get('/', RequireAuthentication, customerController.getAllCustomers);
customerRouter.get('/:id', RequireAuthentication, customerController.getCustomerById);
customerRouter.post('/', RequireAuthentication, customerController.createCustomer);
customerRouter.put('/:id', RequireAuthentication, customerController.updateCustomer);
customerRouter.delete('/:id', RequireAuthentication, customerController.deleteCustomer);

export default customerRouter;
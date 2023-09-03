import { Request, Response } from "express";
import Ping from "../lib/Ping";
import Utilities from "../lib/Utilities";

class PingController extends Ping {
    constructor() {
        super();

        // Bindings
        this.ping = this.ping.bind(this);
        this.verifyPingToken = this.verifyPingToken.bind(this);
    }

    public ping(req: Request, res: Response) {
        try {
            const respData = Utilities.createResponse(true, 'Pong.', null);
            res.status(200).json(respData);
        } catch (error) {
            this.handleError(error);
        }
    }

    public async verifyPingToken(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (token) {
                const verified = await this.verify(token);

                if (verified) {
                    const respData = { status: true, message: 'Token verified.' };
                    res.status(200).json(respData);
                } else {
                    const respData = { status: false, message: 'Token not verified.' };
                    res.status(401).json(respData);
                }
            } else {
                const respData = { status: false, message: 'Token not found.' };
                res.status(401).json(respData);
            }

        } catch (error) {
            this.handleError(error);
        }
    }

    public handleError(error: any) {
        console.error(error);
    }
}

export default PingController;
import IResponse from "../interfaces/IResponse";
import bcrypt from 'bcrypt';

class Utilities {
    public static createResponse(success: boolean, message: string, data: any): IResponse {
        return {
            success: success,
            message: message,
            timestamp: this.dateToEpoch(new Date()).toString(),
            data: data
        };
    }

    public static dateToEpoch(date: Date): number {
        return Math.round(date.getTime() / 1000);
    }

    public static generateToken(len: number): string {
        const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token: string = '';
        for (let i = 0; i < len; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return token;
    }

    static async hashString(str: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(str, salt);
        return hash;
    }

    static async compareHash(str: string, hash: string): Promise<boolean> {
        return bcrypt.compare(str, hash);
    }

    public static isNullOrEmpty(str: string): boolean {
        return str === undefined || str === null || str === '';
    }
}

export default Utilities;
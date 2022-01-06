import * as express from "express";
import { Request, Response, NextFunction } from "express";

class Router {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes(): void {
        this.router.get("/state", (req: Request, res: Response) => {
            const buffer = new Uint8Array(40);
            crypto.getRandomValues(buffer);
            const bytes = Array.from(buffer);
            return res.status(200).json({state: bytes})
        })
    }
}

export const router = new Router().router;
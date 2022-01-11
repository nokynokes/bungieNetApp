import * as express from "express";
import { Request, Response, NextFunction } from "express";

class Router {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes(): void {

    }
}

export const router = new Router().router;
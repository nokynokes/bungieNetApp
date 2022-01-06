import express from "express";
import path from "path";
import { router } from "./router";
import { Request, Response, NextFunction } from "express";

export class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config();
    }

    private config(): void {
      this.app.use(express.static(path.join(__dirname, "../../ui/dist/ui")));
      this.app.get("/*", (req: Request, res: Response) => {
          res.sendFile(path.join(__dirname, "../../ui/dist/ui/index.html"))
      })
    }
}
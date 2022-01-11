import express from "express";
import path from "path";
import { router } from "./router";
import { Request, Response, NextFunction } from "express";
import { Connection } from "./connection";

export class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config();
    }

    private config(): void {
      this.app.get("/token/:code", (req: Request, res: Response) => {
        new Connection().reqestToken(req.params.code)
          .then((vaule) => {
            console.log(vaule.data);
            return res.status(200).json(vaule.data);
          })
          .catch((err) => {

            console.log(err);
            return err
          })
            
      });

      this.app.use(express.static(path.join(__dirname, "../../ui/dist")));
      this.app.get("/*", (req: Request, res: Response) => {
          res.sendFile(path.join(__dirname, "../../ui/dist/index.html"))
      })
    }
}
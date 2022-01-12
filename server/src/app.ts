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
            const today = new Date();
            const expire = new Date().setSeconds(today.getSeconds() + vaule.data.expires_in);
            return res.status(200).json({
                ...vaule.data,
                expires_in: expire,
            });
          })
          .catch((err) => {

            console.log(err);
            return err
          })
            
      });

      this.app.use("/api", router);
      this.app.use(express.static(path.join(__dirname, "../../ui/dist")));
      this.app.get("/*", (req: Request, res: Response) => {
          res.sendFile(path.join(__dirname, "../../ui/dist/index.html"))
      })
    }
}
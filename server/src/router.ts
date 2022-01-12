import axios from "axios";
import * as express from "express";
import { Request, Response, NextFunction } from "express";

class Router {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private bungieGetRequest(path: string){
        return axios.get("http://www.bungie.net/platform" + path, {
            headers: {
                "X-API-Key": ""
            }
        })
    }

    private getRace(raceType: number): string {
        switch(raceType){
            case 0:
                return "Human";
            case 1:
                return "Awoken";
            case 2:
                return "Exo";
            case 3:
                return "Unknown";
            default:
                return ""
        }
    }
    private getClass(classType: number): string {
        switch(classType){
            case 0:
                return "Titan";
            case 1:
                return "Hunter";
            case 2:
                return "Warlock";
            case 3:
                return "Unknown";
            default:
                return "";
        }
    }

    private getGender(genderType: number) {
        switch(genderType){
            case 0:
                return "Male";
            case 1:
                return "Female";
            case 2:
                return "Unknown";
            default:
                return "";
        }
    }

    private configRoutes(): void {
        this.router.get("/membershipIds/:id/:type", (req: Request, res: Response) => {
            const id = req.params.id;
            const type = req.params.type;
            let destinyId = "";
            let iconPath = "";
            this.bungieGetRequest(`/User/GetMembershipsById/${id}/${type}`)
              .then((axiosResponse) => {
                const destinyMemberships = axiosResponse.data.Response.destinyMemberships;
                iconPath = destinyMemberships[0].iconPath;
                destinyId = destinyMemberships[0].membershipId;

                return this.bungieGetRequest(`/Destiny2/${type}/Profile/${destinyId}/?components=200`)
              })
              .then((axiosResponse) => {
                const characters = axiosResponse.data.Response.characters.data;
                let characterData = [];
                let totalMinutesAllChars = 0
                for(const charId in characters){
                    const data = characters[charId];
                    totalMinutesAllChars += data.minutesPlayedTotal;
                    const totalHours = Math.floor(data.minutesPlayedTotal / 60);
                    const totalMinutes = totalHours % 60;
                    characterData.push({
                        characterId: data.characterId,
                        lightLevel: data.light,
                        race: this.getRace(data.raceType),
                        class: this.getClass(data.classType),
                        gender: this.getGender(data.genderType),
                        emblemPath: "https://bungie.net" + data.emblemPath,
                        emblemBackgroudPath: "https://bungie.net" + data.emblemBackgroundPath,
                        minutesPlayedTotal: totalMinutes,
                        hoursPlayedTotal: totalHours,
                    });
                }
                return res.status(200).json({characters: characterData, membershipId: destinyId, icon: iconPath});
            })
        })
    }
}

export const router = new Router().router;
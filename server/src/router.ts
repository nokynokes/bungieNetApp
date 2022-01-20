import axios from "axios";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { Stats } from "./models/character.stats";

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

    private getStats(data: {[key: string]: number}): Stats{
        return {
            mobility: data["2996146975"],
            resilience: data["392767087"],
            recovery: data["1943323491"],
            discipline: data["1735777505"],
            intellect: data["144602215"],
            strength: data["4244567218"]
        };
    }
    private configRoutes(): void {
        this.router.get("/membershipIds/:id/:type", (req: Request, res: Response) => {
            const id = req.params.id;
            const type = req.params.type;
            let destinyId = "", iconPath = "", bungieGlobalDisplayName = "", bungieGlobalDisplayNameCode = "";

            this.bungieGetRequest(`/User/GetMembershipsById/${id}/${type}`)
              .then((axiosResponse) => {
                const destinyMembership = axiosResponse.data.Response.destinyMemberships[0];
                iconPath = `https://www.bungie.net${destinyMembership.iconPath}`;
                destinyId = destinyMembership.membershipId;
                bungieGlobalDisplayName = destinyMembership.bungieGlobalDisplayName;
                bungieGlobalDisplayNameCode = destinyMembership.bungieGlobalDisplayNameCode
                return this.bungieGetRequest(`/Destiny2/${type}/Profile/${destinyId}/?components=200`)
              })
              .then((axiosResponse) => {
                const characters = axiosResponse.data.Response.characters.data;
                let characterData = [];

                for(const charId in characters){
                    const data = characters[charId];

                    const totalHours = Math.floor(data.minutesPlayedTotal / 60);
                    const totalMinutes = totalHours % 60;
                    characterData.push({
                        characterId: data.characterId,
                        lightLevel: data.light,
                        race: this.getRace(data.raceType),
                        class: this.getClass(data.classType),
                        gender: this.getGender(data.genderType),
                        emblemPath: "https://bungie.net" + data.emblemPath,
                        emblemBackgroundPath: "https://bungie.net" + data.emblemBackgroundPath,
                        minutesPlayedTotal: totalMinutes,
                        hoursPlayedTotal: totalHours,
                        stats: this.getStats(data.stats),
                    });
                }

                return res.status(200).json({
                    characters: characterData,
                    destinyMembership: {
                        icon: iconPath,
                        destinyId: destinyId,
                        globalDisplayName: bungieGlobalDisplayName,
                        globalDisplayNameCode: bungieGlobalDisplayNameCode,
                    }
                });
            })
        })
    }
}

export const router = new Router().router;
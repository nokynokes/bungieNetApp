import { RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";
import { RouterStateUrl } from "../types";

export class RouterSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;
        while(route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams },
        } = routerState;
        const { params } = routerState.root;

        return { url, params, queryParams }
    }
}
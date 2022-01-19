
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { HomeState } from "../types";

export const homeSelector = createFeatureSelector<HomeState>("home");

export const isCharacterDataLoaded = createSelector(
    homeSelector,
    (state) => state.characters.length > 0
);

export const getDestinyInfo = createSelector(
    homeSelector,
    (state) => state.destinyMembership.destinyId
);

export const getDestinyIcon = createSelector(
    homeSelector,
    (state) => state.destinyMembership.icon
);

export const getCharacterData = createSelector(
    homeSelector,
    (state) => state.characters
);

export const getTotalTimePlayed = createSelector(
    getCharacterData,
    (characters) => {
        let totalHours = 0;
        let totalMinutes = 0;

        characters.forEach((char) => {
            totalHours += char.hoursPlayedTotal;
            totalMinutes += char.minutesPlayedTotal;
        });

        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes = totalHours % 60;

        return `${totalHours} hours ${totalMinutes} mins`
    }
);

export const getBungieDisplayName = createSelector(
    homeSelector,
    (state) => `${state.destinyMembership.globalDisplayName}#${state.destinyMembership.globalDisplayNameCode}`
)
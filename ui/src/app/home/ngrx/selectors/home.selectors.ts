
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { HomeState } from "../types";

export const homeSelector = createFeatureSelector<HomeState>("home");

export const isCharacterDataLoaded = createSelector(
    homeSelector,
    (state) => state.characters.length > 0
);

export const getDestinyInfo = createSelector(
    homeSelector,
    (state) => state.destinyId
);

export const getDestinyIcon = createSelector(
    homeSelector,
    (state) => state.icon
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
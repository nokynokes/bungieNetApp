export interface Character {
    characterId: string,
    lightLevel: number,
    race: string,
    class: string,
    gender: string,
    emblemPath: string,
    emblemBackgroundPath: string,
    minutesPlayedTotal: number,
    hoursPlayedTotal: number,
}

export interface HomeState {
    characters: Character[],
    destinyId: string,
    icon: string,
}
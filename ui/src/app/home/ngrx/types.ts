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
    stats: Stats,
}

export interface HomeState {
    characters: Character[],
    destinyMembership: DestinyMembership
}

export interface DestinyMembership {
    icon: string,
    destinyId: string,
    globalDisplayName: string,
    globalDisplayNameCode: string,
}

export interface Stats {
    mobility: number;
    resilience: number;
    recovery: number;
    discipline: number 
    intellect: number;
    strength: number;
}
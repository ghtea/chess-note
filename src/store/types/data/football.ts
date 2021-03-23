


export type Team = {
    id: string;
    name: string;
    code: string;
    pathLogo: string;
    country: {
        id: string;
        name: string;
        alpha2: string;
        continent: string;
    }
};
export type StatPlaceTeam = {
    games_played:number
    won:number
    draw:number
    lost:number
    goals_diff:number
    goals_scored:number
    goals_against:number
}
export type StatTeam ={
    id:string;
    points:number;
    position: number;
    status:string;
    result: 'Champions League' | 'Europa League' | 'Relegation' | undefined;
    overall:StatPlaceTeam;
    home:StatPlaceTeam;
    away:StatPlaceTeam;
};

export type LeagueStandings = {
    idLeague: string;
    idSeason: string;
    dateUpdated: number;

    dictStatTeam: { 
        [key: string]: StatTeam 
    }
};

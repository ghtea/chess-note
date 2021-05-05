
import * as actions  from 'store/actions';
import * as types from "store/types";

// actions.data.football.StatTeam[], listOptionSortingActive:types.OptionSorting[]


const returnListStatTeamSorted = (leagueStandings:types.data.football.LeagueStandings, sorting: types.status.Sorting ) => {

    // console.log(listOptionSortingActive);
    const { dictStatTeam } = leagueStandings;
    const {listOptionActive} = sorting;

    let listIdTeam = Object.keys(dictStatTeam);
    
    for (let i = listOptionActive.length - 1; i >= 0; i--){
        
        const {property, direction} = listOptionActive[i];

        let numberIsAscending = direction === 'ascending' ? 1 : -1;
        
        if (property === 'points'){
            listIdTeam.sort((a, b)=> numberIsAscending * (dictStatTeam[a]['points'] - dictStatTeam[b]['points']));
        }
        else {
            listIdTeam.sort((a, b)=> numberIsAscending * (dictStatTeam[a]['overall'][property] - dictStatTeam[b]['overall'][property] ));
        }
    }

    return listIdTeam.reduce((acc, current)=>{acc.push(dictStatTeam[current]); return acc;}, [] as types.data.football.StatTeam[])
}


export default returnListStatTeamSorted;
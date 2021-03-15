import * as types  from 'store/types';


type Sun= {
    dateStart: number;
    dateEnd: number;
    indexStart: number;
    indexEnd: number;
}


const returnListSun = (weatherOne: types.data.weather.WeatherOne): Sun[] => {

    let listSunRaw = weatherOne.daily.map(day=>({sunrise: day.sunrise, sunset: day.sunset}) ) || [];

    const dtStart = weatherOne.hourly[0].dt;
    const dtEnd = weatherOne.hourly[47].dt;

    listSunRaw = listSunRaw.filter( sun=> (dtEnd && sun.sunrise <= dtEnd) && (dtStart && sun.sunset >= dtStart) );
    let listSunRaw2 = listSunRaw.map(sunRaw => {
        return({
            date: new Date(sunRaw.sunrise * 1000).getDate(),
            hoursStart: new Date(sunRaw.sunrise * 1000).getHours(),
            hoursEnd: new Date(sunRaw.sunset * 1000).getHours(),
        })
    });

    let listSun: Sun[] = new Array(listSunRaw2.length).fill({
        dateStart: 0,
        dateEnd: 0,
        indexStart:  0,
        indexEnd: 0,
    });

    // console.log(listSunRaw2)
    for (let iSun = 0; iSun < listSunRaw2.length; iSun++){
        const iHourStart = weatherOne.hourly.findIndex(hour=>(
            (hour.date === listSunRaw2[iSun].date) &&
            (hour.hour === listSunRaw2[iSun].hoursStart)
        ));
        const iHourEnd = weatherOne.hourly.findIndex(hour=>(
            (hour.date === listSunRaw2[iSun].date) &&
            (hour.hour === listSunRaw2[iSun].hoursEnd)
        ));        
        listSun[iSun] = {
            dateStart: listSunRaw2[iSun].date,
            dateEnd: listSunRaw2[iSun].date,
            indexStart:  iHourStart,
            indexEnd: iHourEnd,
        }
    }

    return listSun
}

export default returnListSun;



/*
let listMoon: SunMoon[] = [];
    for (let iSun = 0; iSun < listSun.length; iSun++){
        const sunCurrent = listSun[iSun];
        listMoon.push({
            dateStart: 0,
            dateEnd: sunCurrent.dateStart,
            indexStart:  0,
            indexEnd: sunCurrent.indexStart,
        });
        listMoon.push({
            dateStart: sunCurrent.dateStart,
            dateEnd: 0,
            indexStart:  sunCurrent.indexEnd,
            indexEnd: 0,
        });
    }
    */
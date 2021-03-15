



export type Current = {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    snow?: number;
    weather: {
        id: string;
        main: string;
        description: string;
        icon: string;
    }[];
}



export type HourRaw = {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    snow?: number;
    weather: {
        id: string;
        main: string;
        description: string;
        icon: string;
    }[];
    pop: number;
}
export type Hour = HourRaw & {
    hour: number;
    index: number;
    date: number;
}



export type Day = {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
    };
    feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    wind_speed: number;
    wind_deg: number;
    snow?: number;
    weather: {
        id: string;
        main: string;
        description: string;
        icon: string;
    }[];
}


export type WeatherOne = {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    minutely: {
        dt: number;
        precipitation: number;
    }[];
    hourly: Hour[];
    daily: Day[];
};




import {useState} from "react";
import axios from "axios";

import getCurrentDayForecast from "../helpers/getCurrentDayForecast";
import getCurrentDayDetailedForecast from "../helpers/getCurrentDayForecast";
import getUpcomingDaysForecat from "../helpers/getUpcomingDaysForecast";

const BASE_URL = 'https://www.metaweathwer.com/api/location'
const CROSS_DOMAIN = 'https://the-utimate-api-challenge.herokuapp.com'
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`

// call the api
const useForecast = () => {
    const [isError,  setError] = useState(false);
    const [isLoading,  setLoading] = useState(false);
    const [forecast,  setForecast] = useState(null);

    const getWoeid = async (location) => {
        const {data} = await axios(`${REQUEST_URL}/search`, {params: {query: location}});

         if(!data || data.length === 0){
            setError('There is no such location');
            setLoading(false);
            return;
         }
         return data
    }

    const getForecastData = async (woeid) => {
        const {data} = await axios(`${REQUEST_URL}/${woeid}`);
        if(!data || data.length === 0){
            setError('Something went wrong');
            setLoading(false);
            return;
        }

        return data[0];
    }

    const gatherForecastData = (data) => {
        const currentDay = getCurrentDayForecast(data.conlidated_weather[0], data.title);
        const currentDetails = getCurrentDayDetailedForecast(data.conlidated_weather[0]);
        const upcomingDays = getUpcomingDaysForecat(data.conlidated_weather);

        setForecast({currentDay, currentDetails, upcomingDays});
        setLoading(false);
    }

    const submitRequest = async location => {
        setLoading(true);
        setError(false);
        const response = await getWoeid(location);
        if(!response?.woeid) return;
        const data = await getForecastData(response[0].woeid);
        if(!data) return;

        gatherForecastData(data);
    };

    return {
        isError, 
        isLoading, 
        forecast, 
        submitRequest,
    }
};

export default useForecast;
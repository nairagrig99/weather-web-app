import './App.css'
import {useEffect, useState} from "react";
import LocationSearch from "./components/LocationSearch.tsx";
import CurrentConditions from "./components/CurrentConditions.tsx";

const API_KEY = "Q8MDD8LU9HD8YHPFDNAVZQLAS";

function App() {
    const [locationResponse, setLocation] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    function getCurrentLocation(location: string) {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/yesterday/tomorrow?unitGroup=metric&include=hours&key=${API_KEY}`)
            .then((response) => {
                console.log("response", response)
                if (!response.ok) {
                    throw new Error("Something went wrong")
                }

                return response.json()
            }).then(async (data) => {
            console.log('name', data);
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.latitude}&lon=${data.longitude}`
            );
            const address = await response.json()

            let locationName = '';

            const settlement =
                address.address.city ||
                address.address.town ||
                address.address.village ||
                address.address.hamlet ||
                address.address.municipality ||
                address.address.country ||
                address.state;


            if (settlement) {
                locationName = `${settlement}`.trim();
            }

            console.log("locationName", locationName)
            const locationToSave = {...data, name: locationName};

            localStorage.setItem('location', JSON.stringify(locationToSave));

            setLocation(locationToSave)
        })
            .catch((err) => {
                console.log("errrr", err)
                setError(err.message);
                setLoading(false);
            })
    }

    useEffect(() => {

        const savedLocationString = localStorage.getItem('location')
        if (savedLocationString) {
            const savedLocation = JSON.parse(savedLocationString);
            console.log("savedLocation",savedLocation)
            setLocation(savedLocation)
            setLoading(false)
            return
        }
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("position", position);

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const location = `${latitude},${longitude}`;
            getCurrentLocation(location)
        })
    }, []);


    function inputChange(location) {
        console.log("location", location)
        getCurrentLocation(location)
    }

    return <div className="m-auto flex flex-col items-center justify-center p-10">
        <LocationSearch inputChange={inputChange}/>

        {loading && <p className="text-gray-500 text-sm">Loading weather data...</p>}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <CurrentConditions location={locationResponse}/>
    </div>
}

export default App

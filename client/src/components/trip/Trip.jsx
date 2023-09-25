import "./Trip.css";

import { getTarget, updateTarget } from "../../api/target";
import { useEffect, useState } from "react";

import { PiSun, PiCloudRain } from "react-icons/pi";

const Trip = (props) => {
  const [trip, setTrip] = useState({
    weatherConditions: "",
  });

  const fetchTrip = async () => {
    const trip = await getTarget();
    setTrip(trip);
  };

  const onClickWeather = async (weather) => {
    const updatedTrip = await updateTarget({
      ...trip,
      weatherConditions: weather,
    });
    setTrip(updatedTrip);
    props.update(weather);
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  return (
    <div className="trip">
      <div>
        <h3 aria-label="Your destination" title="Your destination">
          Your trip to <span>{trip.destination}</span> begins here!{" "}
        </h3>
        <h3 aria-label="Your trip title" title="Your trip title">
          {" "}
          It's time to pack your things for your <span>{trip.title}</span>.
        </h3>
      </div>
      <div className="weather">
        <p>Weather</p>
        <div className="weather-buttons">
          <button
            title="Hot weather"
            className={`${trip.weatherConditions === "hot" && "sunny"}`}
            aria-label="Hot weather button"
            onClick={() => onClickWeather("hot")}
          >
            <PiSun />
          </button>
          <button
            title="Cold weather"
            className={`${trip.weatherConditions === "cold" && "rainy"}`}
            aria-label="Cold weather button"
            onClick={() => onClickWeather("cold")}
          >
            <PiCloudRain />
          </button>
          {trip.weatherConditions && (
            <span
              className="clear-weather"
              aria-label="Reset weather button"
              onClick={() => onClickWeather("")}
            >
              Reset
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trip;

import axios from "axios";
import { FlexCenter } from "../components/FlexCenter";
import WeatherCard from "../layouts/WeatherCard";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ErrorAlert } from "../components/Alert";

type WeatherData = {
  name: string;
  timezone: number;
  sunrise: number;
  sunset: number;
  temperature: number;
  wind_speed: number;
  humidity: number;
  pressure: number;
  visibility: number;
  description: string;
  icon: string;
};

const Home = () => {
  const [weatherDetails, setWeatherDetails] = useState<WeatherData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (
    event: ChangeEvent<HTMLFormElement>,
    query: string = "Kolkata",
    setSearching: Dispatch<SetStateAction<boolean>>
  ) => {
    event.preventDefault();
    if (query === "") return;
    setSearching(true);
    setLoading(true);
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?appid=${
          import.meta.env.VITE_OPENWEATHERMAP_API_KEY
        }&q=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setWeatherDetails(() => {
          return {
            name: res.data.name,
            timezone: res.data.timezone,
            sunrise: res.data.sys.sunrise,
            sunset: res.data.sys.sunset,
            temperature: res.data.main.temp,
            wind_speed: res.data.wind.speed,
            humidity: res.data.main.humidity,
            pressure: res.data.main.pressure,
            visibility: res.data.visibility,
            description: res.data.weather[0].main,
            icon: res.data.weather[0].icon,
          };
        });
      })
      .catch(() => {
        ErrorAlert("Location not found!");
      });
    setSearching(false);
    setLoading(false);
  };

  useEffect(() => {
    const fetchKolkataWeather = async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${
            import.meta.env.VITE_OPENWEATHERMAP_API_KEY
          }&q=Kolkata`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setWeatherDetails(() => {
            return {
              name: res.data.name,
              timezone: res.data.timezone,
              sunrise: res.data.sys.sunrise,
              sunset: res.data.sys.sunset,
              temperature: res.data.main.temp,
              wind_speed: res.data.wind.speed,
              humidity: res.data.main.humidity,
              pressure: res.data.main.pressure,
              visibility: res.data.visibility,
              description: res.data.weather[0].main,
              icon: res.data.weather[0].icon,
            };
          });
        })
        .catch(() => {
          ErrorAlert("Network Error!");
        });
      setLoading(false);
    };
    fetchKolkataWeather();
  }, []);

  return (
    <FlexCenter flexDirection="column">
      <WeatherCard
        onSubmit={(
          event: ChangeEvent<HTMLFormElement>,
          query: string,
          setSearching: Dispatch<SetStateAction<boolean>>
        ) => fetchWeather(event, query, setSearching)}
        weatherDetails={weatherDetails}
        loading={loading}
      />
    </FlexCenter>
  );
};

export default Home;

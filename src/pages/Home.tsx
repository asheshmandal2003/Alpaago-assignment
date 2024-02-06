// import { Box, styled } from "@mui/material";
import axios from "axios";
import { FlexCenter } from "../components/FlexCenter";
import WeatherCard from "../layouts/WeatherCard";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

const Home = () => {
  const fetchWeather = async (
    event: ChangeEvent<HTMLFormElement>,
    query: string,
    setSearching: Dispatch<SetStateAction<boolean>>
  ) => {
    event.preventDefault();
    setSearching(true);
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?appid=${
          import.meta.env.VITE_OPENWEATHERMAP_API_KEY
        }&q=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setSearching(false);
  };

  //   const Container = styled(Box)({
  //     height: "100vh",
  //     width: "100%",
  //     backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.5)),url("/images/morning.jpg")`,
  //     backgroundSize: "cover",
  //     backgroundPosition: "center",
  //     backgroundColor: "rgba(255, 255, 255, 0.1)",
  //     WebkitBackdropFilter: "blur(10px)",
  //     backdropFilter: "blur(10px)",
  //   });

  return (
    <FlexCenter flexDirection="column">
      <WeatherCard
        onSubmit={(
          event: ChangeEvent<HTMLFormElement>,
          query: string,
          setSearching: Dispatch<SetStateAction<boolean>>
        ) => fetchWeather(event, query, setSearching)}
      />
    </FlexCenter>
  );
};

export default Home;

import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Searchbar from "../components/Searchbar";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FlexCenter } from "../components/FlexCenter";
import { CalendarMonthOutlined, LocationOnOutlined } from "@mui/icons-material";
import moment from "moment";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  height: "100%",
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  gap: 8,
}));

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

interface SearchbarProps {
  onSubmit(
    event: ChangeEvent<HTMLFormElement>,
    query: string,
    setSearching: Dispatch<SetStateAction<boolean>>
  ): void;
  weatherDetails: WeatherData | null;
  loading: boolean;
}

const WeatherCard = ({ onSubmit, weatherDetails, loading }: SearchbarProps) => {
  const navigate = useNavigate();
  return (
    <>
      <FlexCenter my={5} alignItems="center" flexWrap="wrap">
        <Button
          variant="outlined"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => navigate("/users")}
        >
          Active Users
        </Button>
        <Searchbar onSubmit={onSubmit} />
        <Avatar />
      </FlexCenter>
      <FlexCenter>
        <Grid
          container
          width="80%"
          spacing={2}
          columns={12}
          mt={4}
          sx={{ transition: "0.2s ease-out" }}
        >
          <Grid item md={4} sm={6} xs={12}>
            <Item sx={{ flexDirection: "column" }}>
              {!loading ? (
                weatherDetails && (
                  <img
                    src={`/images/${weatherDetails?.icon}.svg`}
                    height={100}
                    width={100}
                    alt="icon"
                  />
                )
              ) : (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={100}
                  width={100}
                />
              )}
              {loading ? (
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{ fontSize: 28, width: 100 }}
                />
              ) : (
                <Typography fontSize={28} color="#000">
                  {weatherDetails &&
                    (weatherDetails.temperature - 273.15).toFixed(2)}
                  °C
                </Typography>
              )}
              {loading ? (
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{ fontSize: 28, width: 80 }}
                />
              ) : (
                <Typography variant="h6">
                  {weatherDetails && weatherDetails.description}
                </Typography>
              )}
              <Box width="100%" my={3}>
                <Divider />
              </Box>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" flexShrink={0}>
                  <LocationOnOutlined fontSize="large" />{" "}
                  {loading ? (
                    <Skeleton
                      variant="text"
                      animation="wave"
                      sx={{ fontSize: 28, width: 50 }}
                    />
                  ) : (
                    weatherDetails && (
                      <Typography ml={2} variant="body1">
                        {weatherDetails.name}
                      </Typography>
                    )
                  )}
                </Box>
                <Box display="flex" alignItems="center" flexShrink={0}>
                  <CalendarMonthOutlined fontSize="large" />{" "}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    ml={2}
                  >
                    <Typography variant="body1">
                      {moment(Date.now()).format("D MMMM")}
                    </Typography>
                    <Typography variant="body1">
                      {moment(Date.now()).format("dddd")}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Item>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <Grid container spacing={2} columns={12}>
              <Grid item md={6} sm={6} xs={12}>
                <Item>
                  <img
                    src="/images/wind-speed.svg"
                    height={60}
                    width={60}
                    alt="wind-speed"
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Typography variant="h6">Wind Speed</Typography>
                    {loading ? (
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ fontSize: 32, width: 100 }}
                      />
                    ) : (
                      <Typography variant="h6" color="#000">
                        {weatherDetails && weatherDetails.wind_speed} km/h
                      </Typography>
                    )}
                  </Box>
                </Item>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Item>
                  <img
                    src="/images/humidity.svg"
                    height={60}
                    width={60}
                    alt="humidity"
                  />
                  <Box display="flex" flexDirection="column" alignItems="start">
                    <Typography variant="h6">Humidity</Typography>
                    {loading ? (
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ fontSize: 32, width: 80 }}
                      />
                    ) : (
                      <Typography variant="h6" color="#000">
                        {weatherDetails && weatherDetails.humidity}%
                      </Typography>
                    )}
                  </Box>
                </Item>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Item>
                  <img
                    src="/images/pressure.svg"
                    height={60}
                    width={60}
                    alt="pressure"
                  />
                  <Box display="flex" flexDirection="column" alignItems="start">
                    <Typography variant="h6">Pressure</Typography>
                    {loading ? (
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ fontSize: 32, width: 100 }}
                      />
                    ) : (
                      <Typography variant="h6" color="#000">
                        {weatherDetails && weatherDetails.pressure} hPa
                      </Typography>
                    )}
                  </Box>
                </Item>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Item>
                  <img
                    src="/images/visibility.svg"
                    height={60}
                    width={60}
                    alt="visibility"
                  />
                  <Box display="flex" flexDirection="column" alignItems="start">
                    <Typography variant="h6">Visibility</Typography>
                    {loading ? (
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ fontSize: 32, width: 70 }}
                      />
                    ) : (
                      <Typography variant="h6" color="#000">
                        {weatherDetails && weatherDetails.visibility / 1000} km
                      </Typography>
                    )}
                  </Box>
                </Item>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Item>
                  <img
                    src="/images/sunrise.svg"
                    height={60}
                    width={60}
                    alt="sun-rise"
                  />
                  <Box display="flex" flexDirection="column" alignItems="start">
                    <Typography variant="h6">Sun Rise</Typography>
                    {loading ? (
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ fontSize: 32, width: 80 }}
                      />
                    ) : (
                      weatherDetails && (
                        <Typography variant="h6" color="#000">
                          {moment
                            .utc(weatherDetails.sunrise, "X")
                            .add(weatherDetails.timezone, "seconds")
                            .format("HH:mm a")}
                        </Typography>
                      )
                    )}
                  </Box>
                </Item>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Item>
                  <img
                    src="/images/sunset.svg"
                    height={60}
                    width={60}
                    alt="sunset"
                  />
                  <Box display="flex" flexDirection="column" alignItems="start">
                    <Typography variant="h6">Sun Set</Typography>
                    {loading ? (
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ fontSize: 32, width: 80 }}
                      />
                    ) : (
                      weatherDetails && (
                        <Typography variant="h6" color="#000">
                          {moment
                            .utc(weatherDetails.sunset, "X")
                            .add(weatherDetails.timezone, "seconds")
                            .format("HH:mm a")}
                        </Typography>
                      )
                    )}
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FlexCenter>
    </>
  );
};

export default WeatherCard;

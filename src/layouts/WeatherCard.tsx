import {
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Searchbar from "../components/Searchbar";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FlexCenter } from "../components/FlexCenter";
import { CalendarMonthOutlined, LocationOnOutlined } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  gap: 8,
}));

interface SearchbarProps {
  onSubmit(
    event: ChangeEvent<HTMLFormElement>,
    query: string,
    setSearching: Dispatch<SetStateAction<boolean>>
  ): void;
}

const WeatherCard = ({ onSubmit }: SearchbarProps) => {
  return (
    <>
      <FlexCenter my={5}>
        <Searchbar onSubmit={onSubmit} />
      </FlexCenter>
      <FlexCenter>
        <Grid container width="80%" spacing={2} columns={12} mt={4}>
          <Grid item md={4} sm={6} xs={12}>
            <Item sx={{ flexDirection: "column" }}>
              <img src="/images/01n.svg" height={100} width={100} alt="icon" />
              <Typography fontSize={28} color="#000">
                10.9°C
              </Typography>
              <Typography>Clear Sky</Typography>
              <Box width="100%" my={3}>
                <Divider />
              </Box>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" flexShrink={0}>
                  <LocationOnOutlined fontSize="large" />{" "}
                  <Typography ml={1}>Kolkata</Typography>
                </Box>
                <Box display="flex" alignItems="center" flexShrink={0}>
                  <CalendarMonthOutlined fontSize="large" />{" "}
                  <Typography ml={1}>
                    6th Feb <br />
                    Tuesday
                  </Typography>
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
                  <Box display="flex" flexDirection="column" alignItems="start">
                    <Typography variant="h6">Wind Speed</Typography>
                    <Typography variant="h6" color="#000">
                      0 km/h
                    </Typography>
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
                    <Typography variant="h6" color="#000">
                      82%
                    </Typography>
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
                    <Typography variant="h6" color="#000">
                      1018 hPa
                    </Typography>
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
                    <Typography variant="h6" color="#000">
                      10 km
                    </Typography>
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
                    <Typography variant="h6" color="#000">
                      6:11
                    </Typography>
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
                    <Typography variant="h6" color="#000">
                      17:07
                    </Typography>
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

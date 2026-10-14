import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";
import moment from "moment"

import { useEffect, useState } from "react";

function App() {
  let cancelAxios = null;

  const [temperature, setTemperature] = useState({
    temp: null,
    max: null,
    min: null,
    description: null,
    icon: null,
  });



  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=36.2012&lon=37.1612&appid=aafea430cc010feaf8a0660e076ed55a",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        },
        {
          params: {
            postId: 5,
          },
        },
      )
      .then((response) => {
        const temp = Math.round(response.data.main.temp - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const description = response.data.weather[0].description;
        const responeIcon = response.data.weather[0].icon;
					
				
        setTemperature({
          temp,
          max,
          min,
          description,
          icon: `https://openweathermap.org/img/wn/${responeIcon}@2x.png`,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: ["Cairo"],
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        {/* CONTENT CONTAINER */}
        <Box
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* CARD */}
          <Box
            dir="rtl"
            style={{
              width: "100%",
              background: "rgb(28 52 91 / 36%)",
              color: "white",
              padding: "10px",
              borderRadius: "15px",
              boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
            }}
          >
            {/* CONTENT */}
            <Box>
              {/* CITY & TIME */}
              <Box
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "start",
                }}
                dir="rtl"
              >
                <Typography
                  variant="h2"
                  style={{
                    marginRight: "20px",
                    fontWeight: "600",
                  }}
                >
                  حلب
                </Typography>

                <Typography variant="h5" style={{ marginRight: "20px" }}>
										{moment().format('MMMM Do YYYY, h:mm:ss a')}
                </Typography>
              </Box>
              {/* == CITY & TIME == */}

              <hr />

              {/* CONTAINER OF DEGREE + CLOUD ICON */}
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {/* DEGREE & DESCRIPTION */}
                <Box >
                  {/* TEMP */}
                  <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <Typography variant="h1" style={{ textAlign: "right" }}>
                      {temperature.temp}
                    </Typography>

                    <img src={temperature.icon} alt="weather icon" />
                  </Box>
                  {/*== TEMP ==*/}

                  <Typography variant="h6">{temperature.description}</Typography>

                  {/* MIN & MAX */}
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5>الصغرى: {temperature.max}</h5>
                    <h5 style={{ margin: "0px 5px" }}>|</h5>
                    <h5>الكبرى: {temperature.min}</h5>
                  </Box>
                </Box>
                {/*== DEGREE & DESCRIPTION ==*/}

                <CloudIcon
                  style={{
                    fontSize: "200px",
                    color: "white",
                  }}
                />
              </Box>
              {/*= CONTAINER OF DEGREE + CLOUD ICON ==*/}
            </Box>
            {/* == CONTENT == */}
          </Box>
          {/*== CARD ==*/}

          {/* TRANSLATION CONTAINER */}
          <Box
            dir="rtl"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              marginTop: "20px",
            }}
          >
            <Button style={{ color: "white" }} variant="text">
              إنجليزي
            </Button>
          </Box>
          {/*== TRANSLATION CONTAINER ==*/}
        </Box>
        {/*== CONTENT CONTAINER ==*/}
      </Container>
    </ThemeProvider>
  );
}

export default App;

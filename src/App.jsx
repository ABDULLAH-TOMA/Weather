import { createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudIcon from '@mui/icons-material/Cloud';
import axios from "axios"

import { useEffect, useState } from 'react';

function App() {
let cancelAxios = null

const [temperature , setTemperature ] = useState("")

useEffect(() => {
	axios
  .get("https://api.openweathermap.org/data/2.5/weather?lat=36.2012&lon=37.1612&appid=aafea430cc010feaf8a0660e076ed55a",{
		cancelToken: new axios.CancelToken((c) => {
			cancelAxios = c
		}) 

	} , {
    params: {
      postId: 5,

    },
  })
  .then((response) => {
		console.log(Math.round(response.data.main.temp - 272.15))
		setTemperature({ temp:Math.round(response.data.main.temp - 272.15),tempMax:Math.round(response.data.main.temp_max - 272.15),tempMin:Math.round(response.data.main.temp_min - 272.15)})
  })
  .catch((error) => {
		console.error(error);
  })

	return () => {
		console.log("cancel")
		cancelAxios()
	};
},[])


const theme = createTheme({
  typography: {
    fontFamily:["Cairo"]
  }
})



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
										الرياض
									</Typography>

									<Typography
										variant="h5"
										style={{ marginRight: "20px" }}
									>
										الإثنين ١٠-١٠-٢٠٤٠
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
									<Box>
										{/* TEMP */}
										<Box>
											<Typography
												variant="h1"
												style={{ textAlign: "right" }}
											>
												{temperature.temp}
											</Typography>

											{/* TODO: TEMP IMAGE */}
										</Box>
										{/*== TEMP ==*/}

										<Typography variant="h6">
											broken clouds
										</Typography>

										{/* MIN & MAX */}
										<Box
											style={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<h5>الصغرى: {temperature.tempMin}</h5>
											<h5 style={{ margin: "0px 5px" }}>
												|
											</h5>
											<h5>الكبرى: {temperature.tempMax}</h5>
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
  )
}

export default App

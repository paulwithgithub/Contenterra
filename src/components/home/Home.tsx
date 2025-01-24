import { Masonry } from "@mui/lab";
import React, { useEffect, useState } from "react";
import BasicCard from "../basicCard/BasicCard.tsx";
import { AppBar, Box, Stack } from "@mui/material";
import Navbar from "./Appbar.tsx";
import CircularProgress from '@mui/material/CircularProgress';



type ApiStatus = "INITIAL" | "LOADING" | "SUCCESS" | "ERROR";

export interface EachCardData {
  title: string;
  selfTextHtml: string;
  url: string;
  score: number;
}

const Home = () => {
  const [data, setData] = useState<EachCardData[]>([]);
  const [apiStatus, setApiStatus] = useState<ApiStatus>("INITIAL");
  const getData = async () => {
    setApiStatus("LOADING");
    try {
      const response = await fetch("https://www.reddit.com/r/reactjs.json");
      if (response.ok) {
        setApiStatus("SUCCESS");
        const data = await response.json();
        const updatedData = data.data.children.map((each) => ({
          title: each.data.title,
          selfTextHtml: each.data.selftext_html,
          score: each.data.score,
          url: each.data.url,
        }));
        setData(updatedData);
        console.log(updatedData);
      } else {
        throw new Error("Something Went Wrong");
      }
    } catch (err) {
      setApiStatus("ERROR");
    }
  };
  useEffect(() => {
    console.log('apiStatus')
    getData();
  }, []);
  return (
    <div>
    {apiStatus === 'LOADING'  ? 
     <Box sx={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
     <CircularProgress style={{color: '#865d36'}}/>
 </Box>:
    <Stack style={{backgroundColor: '#3e362e', paddingTop: 10, paddingLeft: 10}}>
    <Masonry columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }} spacing={3}>
      {data.slice(1).map((each) => (
        <BasicCard info={each} />
      ))}
    </Masonry>
      </Stack>
     
    }
    </div>
  );
};

export default Home;

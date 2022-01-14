import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { optionsCoinsAPI } from "../API.js";
import { Link } from "react-router-dom";

import axios from "axios";
import millify from "millify";
import Currencies from "../components/Currencies.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let ignore = false;

    setIsError(false);
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(`${optionsCoinsAPI.url}/coins`, optionsCoinsAPI)
        .then((response) => {
          setStats(response.data.data.stats);
        })
        .catch((e) => {
          setIsError(true);
        })
        .then(() => {
          setIsLoading(false);
        });
    };

    if (!ignore) {
      fetchData();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Box sx={{ p: 1 }} className="homepage-container">
      {isError ? (
        <Typography variant="h6">Something went wrong</Typography>
      ) : isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Box className="homepage-stats-container">
            <Typography variant="h4" color="neutral.main">
              Global Crypto Stats
            </Typography>
            <Grid container spacing={1} sx={{ py: 2 }}>
              <Grid item lg={3} md={6} xs={12} className="stat-box">
                <Box className="statistic">
                  <Typography variant="h6">Total Crypto Currencies</Typography>
                  <Typography variant="h4" color="neutral.main">
                    {stats?.total}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={3} md={6} xs={12} className="stat-box">
                <Box className="statistic">
                  <Typography variant="h6">Total Market Cap</Typography>
                  <Typography variant="h4" color="neutral.main">
                    {(stats && millify(stats?.totalMarketCap)) || 0}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={3} md={6} xs={12} className="stat-box">
                <Box className="statistic">
                  <Typography variant="h6">Total 24h Volume</Typography>
                  <Typography variant="h4" color="neutral.main">
                    {(stats && millify(stats?.total24hVolume)) || 0}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={3} md={6} xs={12} className="stat-box">
                <Box className="statistic">
                  <Typography variant="h6">Total Markets</Typography>
                  <Typography variant="h4" color="neutral.main">
                    {(stats && millify(stats?.totalMarkets)) || 0}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className="homepage-crypto-container">
            <Box sx={{ my: 4 }}>
              <Typography variant="h4"> Top 12 Crypto</Typography>
              <Typography
                variant="h6"
                color="secondary.main"
                variant="subtitle1"
              >
                <Link to="/crypto" style={{ color: "inherit" }}>
                  See more
                </Link>
              </Typography>
            </Box>
            <Currencies simplified />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;

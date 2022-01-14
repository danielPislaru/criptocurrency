import React, { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { optionsCoinsAPI } from "../API.js";
import axios from "axios";

import millify from "millify";
import HTMLReactParser from "html-react-parser";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { Line } from "react-chartjs-2";
import LoadingScreen from "./LoadingScreen.jsx";

const CurrenciesDisplay = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [coinDetails, setCoinDetails] = useState([]);
  const [coinHistory, setCoinHistory] = useState(null);
  const [timePeriod, setTimePeriod] = useState("7d");

  const time = ["24h", "7d", "30d", "1y", "5y"];

  useEffect(() => {
    let ignore = false;

    setIsError(false);
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(`${optionsCoinsAPI.url}/coin/${id}`, optionsCoinsAPI)
        .then((response) => {
          setCoinDetails(response.data.data.coin);
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

  useEffect(() => {
    let ignore = false;

    setIsError(false);
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(
          `${optionsCoinsAPI.url}/coin/${id}/history/${timePeriod}`,
          optionsCoinsAPI
        )
        .then((response) => {
          setCoinHistory(response.data);
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
  }, [timePeriod]);

  const coinPrice = parseInt(coinDetails?.price) || 0;
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`,
    },
    { title: "Rank", value: coinDetails?.rank },
    {
      title: "24h Volume",
      value: `$ ${coinDetails?.volume && millify(coinDetails?.volume)}`,
    },
    {
      title: "Market Cap",
      value: `$ ${coinDetails?.marketCap && millify(coinDetails?.marketCap)}`,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        coinDetails?.allTimeHigh?.price &&
        millify(coinDetails?.allTimeHigh?.price)
      }`,
    },
  ];

  return (
    <Box sx={{ p: 1 }} className="details-container">
      {isError ? (
        <Typography variant="h6">Something went wrong</Typography>
      ) : isLoading ? (
        <LoadingScreen />
      ) : (
        <Box className="coin-details">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              my: 2,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <img src={coinDetails?.iconUrl} alt={coinDetails?.name} />
              <Typography variant="h4" color="neutral.main">
                {coinDetails?.name}
              </Typography>
            </Box>
            <Paper bgcolor="primary.light" sx={{ p: 1 }}>
              <Typography variant="h2" color="neutral.main" color="secondary">
                ${millify(coinPrice)}
              </Typography>
            </Paper>
          </Box>

          <Typography variant="h6">
            {coinDetails.name} Live Price in US dollars.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Typography variant="h6">
              View value statistics, market cap and supply
            </Typography>
            <Select
              value={timePeriod}
              size="small"
              sx={{ mx: 2 }}
              onChange={(e) => {
                setTimePeriod(e.target.value);
              }}
            >
              {time.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {coinHistory !== null && (
            <Box className="history-container">
              <Box className="generalstats-container">
                <Paper sx={{ p: 1 }} className="general-statistics">
                  {stats?.map(({ title, value }, idx) => {
                    return (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">{title}</Typography>
                        <Typography variant="h4" color="neutral.main">
                          {value}
                        </Typography>
                      </Box>
                    );
                  })}
                </Paper>
                <Paper sx={{ p: 1 }} className="general-statistics">
                  {stats?.map(({ title, value }, idx) => {
                    return (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">{title}</Typography>
                        <Typography variant="h4" color="neutral.main">
                          {value}
                        </Typography>
                      </Box>
                    );
                  })}
                </Paper>
              </Box>
              <LineChart
                coinHistory={coinHistory}
                currentPrice={millify(coinPrice)}
                coinName={coinDetails.name}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

const LineChart = ({ coinHistory }) => {
  let coinPrice = [];
  let coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);

    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#ffcb3b",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Price in USD",
      },
    },
    scales: {},
  };
  return (
    <Box className="chart-container" sx={{ p: 1 }}>
      <Line data={data} options={options} width={10} height={5} />
    </Box>
  );
};

export default CurrenciesDisplay;

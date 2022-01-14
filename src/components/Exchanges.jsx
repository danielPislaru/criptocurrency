import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { optionsCoinsAPI } from "../API.js";

import axios from "axios";
import millify from "millify";
import LoadingScreen from "./LoadingScreen.jsx";
import HTMLReactParser from "html-react-parser";

const Exchanges = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    let ignore = false;

    setIsError(false);
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(`${optionsCoinsAPI.url}/exchanges`, optionsCoinsAPI)
        .then((response) => {
          setExchanges(response.data.data.exchanges);
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

  console.log(exchanges);

  return (
    <Box className="currencies-container" sx={{ p: 1 }}>
      {isError ? (
        <Typography variant="h6">Something went wrong</Typography>
      ) : isLoading ? (
        <LoadingScreen />
      ) : (
        <Box className="exchanges-container">
          <Box className="exchanges-header" sx={{ display: "flex" }}>
            <Typography variant="h6" className="col-header">
              Exchanges
            </Typography>
            <Typography variant="h6" className="col-header">
              24h Trade Volume
            </Typography>
            <Typography variant="h6" className="col-header">
              Markets
            </Typography>
            <Typography variant="h6" className="col-header">
              Change
            </Typography>
          </Box>
          <Box className="exchanges-body">
            {exchanges?.map((exchange, idx) => (
              <Accordion key={idx} sx={{ my: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMore color="secondary" />}
                  aria-controls="panel1a-content"
                >
                  <Box
                    sx={{ display: "flex", width: "25%", alignItems: "center" }}
                  >
                    <img src={exchange.iconUrl} alt="img-source" />
                    <Typography variant="h6" noWrap={true}>
                      {exchange.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", width: "25%" }}>
                    <Typography variant="h6">
                      ${millify(exchange.volume)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", width: "25%" }}>
                    <Typography variant="h6">
                      {millify(exchange.numberOfMarkets)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", width: "25%" }}>
                    <Typography variant="h6">
                      {millify(exchange.marketShare)}%
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle1" color="neutral.main">
                    {HTMLReactParser(exchange.description || "")}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Exchanges;

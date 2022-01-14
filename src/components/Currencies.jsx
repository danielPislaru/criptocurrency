import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { optionsCoinsAPI } from "../API.js";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import millify from "millify";
import LoadingScreen from "./LoadingScreen.jsx";

const Currencies = ({ simplified }) => {
  let navigate = useNavigate();
  const count = simplified ? 12 : 80;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cryptoList, setCryptoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let ignore = false;

    setIsError(false);
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(`${optionsCoinsAPI.url}/coins?limit=${count}`, optionsCoinsAPI)
        .then((response) => {
          setCryptoList(response.data.data.coins);
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

  const filteredCrypto = searchTerm
    ? cryptoList.filter((crypto) =>
        crypto.name.toLowerCase().includes(searchTerm)
      )
    : cryptoList;

  return (
    <Box className="currencies-container" sx={{ p: 1 }}>
      {isError ? (
        <Typography variant="h6">Something went wrong</Typography>
      ) : isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Box className="input-search-container" sx={{ my: 1 }}>
            {!simplified && (
              <TextField
                fullWidth
                placeholder="Search crypto"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
          </Box>
          <Box className="top-crypto-container" spacing={2} sx={{ mt: 0 }}>
            {filteredCrypto?.map((crypto) => {
              return (
                <Box key={crypto.id} className="crypto-box">
                  <Paper sx={{ backgroundColor: "primary.light" }}>
                    <Box>
                      <Box
                        sx={{
                          p: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: `1px solid `,
                          borderColor: "primary.main",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "calc(100% - 100px)",
                          }}
                        >
                          <img
                            className="crypto-image"
                            src={crypto.iconUrl}
                            alt={crypto.name}
                          />
                          <Typography
                            variant="h6"
                            color="neutral.main"
                            noWrap={true}
                          >
                            {crypto.name}
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => {
                            navigate(`/crypto/${crypto.id}`);
                          }}
                        >
                          More
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          px: 1,
                          my: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h6">Price</Typography>
                          <Typography variant="subtitle2" color="neutral.main">
                            ${millify(crypto.price)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h6">Market Cap</Typography>
                          <Typography variant="subtitle2" color="neutral.main">
                            {millify(crypto.marketCap)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h6">Daily Change</Typography>
                          <Typography variant="subtitle2" color="neutral.main">
                            {millify(crypto.change)}%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Currencies;

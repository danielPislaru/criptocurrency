export const optionsCoinsAPI = {
  method: "GET",
  url: `${process.env.REACT_APP_URL_BACKPOINT}`,
  headers: {
    "x-rapidapi-host": `${process.env.REACT_APP_APP_HOST}`,
    "x-rapidapi-key": `${process.env.REACT_APP_APP_KEY}`,
  },
};

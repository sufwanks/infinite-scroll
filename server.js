const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// simple route
app.get("/api", async (req, res) => {
  const { page } = req.query;
  const response = await axios.get(
    `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`
  );
  console.log(response);
  res.json(response.data);
  //   res.json({ message: "weather app" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

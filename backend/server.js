const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/api/menu", async (req, res) => {
  const { resId } = req.query;
  try {
    const response = await axios.get(
     `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.6203536&lng=77.7580826&restaurantId=${resId}&submitAction=ENTER`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0",
          "Referer": "https://www.swiggy.com/",
          "Accept": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Swiggy API failed" });
  }
});

app.listen(3001, () => {
  console.log("Proxy server running on port 3001");
});

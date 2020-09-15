const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Users, Auth } = require("./models/index");

const app = express();
const port = 7711;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/signup", (req, res) => {
  //req.body should include username, avatar and password
  Users.create(req.body)
    .then((response) => res.send(response))
    .catch((err) => {
      res.send(err);
    });
});

app.get("/getItemID", (req, res) => {
  // console.log(req.query.item);
  const itemName = req.query.item;
  axios
    .get(
      `https://www.pricecharting.com/api/products?t=36330d87343dc3b342b42a4f6c58b13e443061c8&q=${itemName}`
    )
    .then((response) => {
      // console.log(response.data.results);
      res.send(response.data);
    })
    .then((res) => {
      axios
        .get(
          `https://www.pricecharting.com/api/products?t=36330d87343dc3b342b42a4f6c58b13e443061c8&id=${res.data.products[0]["id"]}`
        )
        .then((res) => {
          res.send(res.data.products["new-price"]);
        });
    })
    .catch((err) => console.log(err));
});
app.listen(port, () => {
  console.log("listening in on port ", port);
});

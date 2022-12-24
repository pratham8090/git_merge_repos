const express = require("express");
const app = express();
app.use(express.json());
const Sequelize = require("sequelize");

const sequelize = new Sequelize("pj", "root", "admin@123", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.get("/", async function (req, res) {
  const results = await sequelize.query(
    "SELECT jsonField FROM table2 LIMIT 1;"
  );
  jsonField = results[0][0].jsonField.replace(/\n/g, '');

  res.send(JSON.parse(jsonField));
});

app.listen(process.env.PORT || 5000, function () {
  console.log("Express app running on port " + (process.env.PORT || 5000));
});

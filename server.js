const express = require("express");
const app = express();
const PORT = process.env.PORT || 3300;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("./Develop/client"));

const apiRoutes = require("./Dev/server/api-routes");
app.use(apiRoutes);

const clientRoutes = require("./Dev/server/client-routes");
app.use(clientRoutes);

app.listen(PORT, () => console.log(`listening at: http://localhost:${PORT}`));
const express = require("express");
const path = require('path');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

//bring routes
const authRoutes = require("./routes/authRoutes");
const routes = require("./routes/routes");
const userRouters = require("./routes/userRoutes");

//app
const app = express();

//database connect
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected")).catch = (err) => {
  console.log(err.message);
};

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if (process.env.NODE_ENV == "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes middleware
app.use("/api", routes);
app.use("/api", authRoutes);
app.use("/api", userRouters);

app.use('/files', express.static(path.resolve(__dirname, ".", "files")))

//port
const port = process.env.PORT || 3306;
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});

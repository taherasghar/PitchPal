require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 2024;
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOption.js");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/DBConnection.js");
const errorHandler = require("./middlewares/errorHandler.js");
const path = require("path");
connectDB();

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/", require("./routes/rootRoutes.js"));

app.use("/auth", require("./routes/authRoutes.js"));

app.use("/users", require("./routes/usersRoutes.js"));

app.use("/stadiums", require("./routes/stadiumsRoutes.js"));

app.use("/host-form", require("./routes/hostFormRoutes.js"));

app.use("/bookings", require("./routes/bookingRoutes.js"));

app.use("/upload", require("./routes/uploadRoutes.js"));

app.use("/admin", require("./routes/adminRoutes.js"));

app.all("*", (req, res) => {
  console.log(`Some baka was searching for ${req.url}`);
  res.status(404);
  res.json({ message: "Error 404 Not Found!" });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to Database!");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT} `));
});

mongoose.connection.on("error", (error) => {
  console.log(error);
  console.log(
    `${error.errno}\t${error.code}\t${error.syscall}\t${error.hostname}`
  );
});

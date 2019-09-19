const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./auth/authRouter");
const app = express();

const PORT = process.env.PORT || 4000;

//* Global Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//* Routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT} ...`)
);

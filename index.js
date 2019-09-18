const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const authRouter = require("./auth/authRouter");
const app = express();

const PORT = process.env.PORT || 4000;

const sessionConfig = {
  name: "oatmealRaisin",
  secret: process.env.SECRET || "secret",
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false // GDPR Laws against setting cookies automatically
};

//* Global Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(session(sessionConfig));

//* Routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT} ...`)
);

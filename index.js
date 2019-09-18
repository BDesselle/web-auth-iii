const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const db = require("./data/dbConfig");
const authRouter = require("./auth/authRouter");
const app = express();

const PORT = process.env.PORT || 4000;

const sessionConfig = {
  name: "oatmealRaisin",
  secret: process.env.SESSION_SECRET || "secret",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true, // GDPR Laws against setting cookies automatically
  store: new knexSessionStore({
    knex: db,
    tablename: "knexsessions",
    sidfieldname: "sessionid",
    createtable: true,
    clearInterval: 1000 * 60 * 30
  })
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

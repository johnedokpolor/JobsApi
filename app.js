require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// routers
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");

// middlewares
const authenticateUser = require("./middleware/authentication");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const connectDB = require("./db/connect");

app.use(express.json());
// extra packages
app.use("trust proxy", 1);
app.use(
  rateLimiter({
    windowsMs: 15 * 60 * 1000, // 15minutes
    max: 100, // limit each IP to 100 requests per windowsMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 1000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
};

start();

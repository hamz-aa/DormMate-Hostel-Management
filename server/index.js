import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./database/connection.js";
import { swaggerDocs, swaggerUi } from "./swaggerConfig.js";
import authRoute from "./routes/authRoute.js";
import announcementRoute from "./routes/announcementRoute.js";
import feeRoute from "./routes/feeRoute.js";
import roomRoute from "./routes/roomRoute.js";
import studentRoute from "./routes/studentRoute.js";
import suggestionRoute from "./routes/suggestionRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "*", // Update with your frontend's origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.options("*", cors());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send("hi there!");
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/announcements", announcementRoute);
app.use("/api/fees", feeRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/students", studentRoute);
app.use("/api/suggestions", suggestionRoute);
app.use("/api/dashboard", dashboardRoute);

// error messages middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// start the server
// if (process.env.NODE_ENV !== "test") {
app.listen(PORT, () => {
  connection();
  console.log(`Server started at http://localhost:${PORT}`);
});
// }

export default app;

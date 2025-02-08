import express from "express";
import router from "./routes/routes.js";
import cors from "cors";
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.listen(port, (error) => {
  if (error) {
    console.log("Error running the server");
  }
  console.log("Server is listening at the port :", port);
});

app.use("/api", router);

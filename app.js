import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileupload from "express-fileupload";
import index from "./src/routes/index";
const app = express();
import connectDb from "./src/connection/dbConnection";
connectDb();
app.use('/api', index);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let corsOptions = {
    origin: "http://localhost:3000",
    Credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileupload({useTempFiles:true}))

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the beginning of nothingness.",
    status: "success",
  });
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log("server up and running", PORT);
});

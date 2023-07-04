import { AppDataSource } from "src/config/data-source";
import express from "express";
import cors from "cors";
import { router } from "src/routes";

const PORT = process.env.PORT || 8000;

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.use(router);

    app.listen(PORT, () => {
      console.log(`server is running in port ${PORT}`);
    });
  })
  .catch((error: Error) => console.log(error));

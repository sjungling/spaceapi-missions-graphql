import LocalDatabase from "./local-database";
import { DataSource } from "apollo-datasource";
import { join } from "path";

const databasePath = join(__dirname, "..", "db", "apollo.sqlite3");
const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: databasePath,
  },
  useNullAsDefault: false,
};

export const dataSources = (): { [key: string]: DataSource } => ({
  db: new LocalDatabase(knexConfig) as DataSource,
});

import { SQLDataSource } from "datasource-sql";
import { DataSource } from "apollo-datasource";
import { join } from "path";

const databasePath = join(__dirname, "db", "apollo.sqlite3");
const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: databasePath,
  },
  useNullAsDefault: false,
};

class MyDatabase extends SQLDataSource {
  knex: any;
  constructor(config: any) {
    super(config);
  }
  getMissions() {
    return this.knex.select("*").from("missions");
  }
  getMissionById(mission_id: Number) {
    return this.knex
      .select("*")
      .from("missions")
      .where({ id: mission_id })
      .limit(1);
  }
  getMissionMediaById(mission_id: Number) {
    return this.knex.select("*").from("media").where({ mission_id });
  }
  getAstronautsByMission(mission_id: Number) {
    return this.knex
      .select("crew.*")
      .from("crew")
      .join("mission_crew", "crew.id", "=", "mission_crew.crew_id")
      .where({
        mission_id: mission_id,
      });
  }
  getAstronauts() {
    return this.knex.select("*").from("crew");
  }
  getAstronautById(astronaut_id: Number) {
    return this.knex
      .select("*")
      .from("crew")
      .where({ id: astronaut_id })
      .limit(1);
  }
}

export const dataSources = () => ({
  db: new MyDatabase(knexConfig) as DataSource,
});

import { Mission, Resolvers, ResolversTypes } from "../../types/resolvers";

const missionResultToMissionType = (result: any): Mission => {
  return {
    id: result.id,
    mission: result.mission,
    launchDate: result.launch_date_time,
    commandModule: result.cm_name === "N/A" ? null : result.cm_name,
    lunarModule: result.lm_name === "N/A" ? null : result.lm_name,
    launchVehicle: result.launch_vehicle,
    notes: result.remarks,
    duration: result.duration ? parseInt(result.duration, 10) : null,
  };
};
export const resolvers: Resolvers = {
  /**
   * Query-Resolvers for the `Mission` schema package
   */
  Query: {
    missions: async (_root, _args, { dataSources }) => {
      /**
       * `results` and `response` are both defined to provide TypeScript
       * better visibility into the ultimate response object
       */
      const results = await dataSources.db.getMissions();
      const response = results.map(
        ({
          id,
          mission,
          launch_date_time,
          cm_name,
          lm_name,
          launch_vehicle,
          remarks,
          duration,
        }) => {
          return {
            id,
            mission,
            launchDate: launch_date_time,
            commandModule: cm_name === "N/A" ? null : cm_name,
            lunarModule: lm_name === "N/A" ? null : lm_name,
            launchVehicle: launch_vehicle,
            notes: remarks,
            duration: duration ? parseInt(duration, 10) : null,
          };
        }
      );
      return response;
    },
    mission: async (_root, args, { dataSources }) => {
      const result = await dataSources.db.getMissionById(args.id);
      let response;
      if (result.length > 0) {
        response = missionResultToMissionType(result[0]);
      } else {
        response = {
          message: "Unable to find that particular mission",
        };
      }
      return response;
    },
  },
  /**
   * Field-Resolvers for `Mission`
   */
  Mission: {
    astronauts: async (root, _args, { dataSources }) => {
      const results = await dataSources.db.getAstronautsByMission(root.id);
      const response = results.map(({ id, first_name, last_name }) => {
        return {
          id,
          firstName: first_name,
          lastName: last_name,
        };
      });
      return response;
    },
  },
  /**
   * Union Resolve Types
   */
  MissionResult: {
    __resolveType: (obj, _context, _info) => {
      /**
       * Cast `obj` as `Mission` otherwise TS is confused on the existence of `id`
       */
      if ((obj as Mission)?.id) {
        return "Mission";
      } else {
        return "NotFound";
      }
    },
  },
};

import { Mission, NotFound, Resolvers } from "../../types/resolvers";
import { formatAstronaut } from "../astronauts/astronauts.resolver";

export const formatMission = (result: any): Mission => ({
  id: result.id,
  mission: result.mission,
  launchDate: result.launch_date_time,
  commandModule: result.cm_name === "N/A" ? null : result.cm_name,
  lunarModule: result.lm_name === "N/A" ? null : result.lm_name,
  launchVehicle: result.launch_vehicle,
  notes: result.remarks,
  duration: result.duration ? parseInt(result.duration, 10) : null,
  status: result.status?.toUpperCase(),
});

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
      const response = results.map((result) => formatMission(result));
      return response;
    },
    mission: async (_root, args, { dataSources }) => {
      const result = await dataSources.db.getMissionById(args.id);
      let response;
      if (result.length > 0) {
        response = formatMission(result[0]);
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
      const response = results.map((result) => formatAstronaut(result));
      return response;
    },
    media: async (root, _args, { dataSources }) => {
      const results = await dataSources.db.getMissionMediaById(root.id);
      const response = results.map(
        ({ url, attribution, type, sub_type, description }) => ({
          url,
          attribution: attribution ?? null,
          type: type.toUpperCase(),
          subType: sub_type?.toUpperCase() ?? null,
          description: description ?? null,
        })
      );
      return response;
    },
  },
  /**
   * Union Resolve Types
   */
  MissionResult: {
    __resolveType: (obj) => {
      /**
       * Cast `obj` as `NotFound` otherwise TS is confused on the existence of `id`
       */
      if ((obj as NotFound)?.message) {
        return "NotFound";
      } else {
        return "Mission";
      }
    },
  },
};

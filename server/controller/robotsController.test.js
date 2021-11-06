const Robot = require("../../database/models/Robot");
const getRobots = require("./robotsController");

jest.mock("../../database/models/Robot");

describe("Given a getRobots function,", () => {
  describe("When it receives a res object,", () => {
    test("Then it should invoke the method json", async () => {
      const robots = [
        {
          name: "Mazinger Z",
          image: "imageMazingerZ",
          speed: "20",
          stamina: "75",
          creation_date: "01-jan-2000",
          token: "czj8p47m27",
        },
        {
          name: "Great Mazinger",
          image: "imageGreatMazinge",
          speed: "25",
          stamina: "80",
          creation_date: "02-feb-2001",
          token: "lu4opp6plv",
        },
      ];
      Robot.find = jest.fn().mockResolvedValue(robots);
      const res = {
        json: jest.fn(),
      };
      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
});

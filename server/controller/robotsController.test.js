const Robot = require("../../database/models/Robot");
const { getRobots, getRobotById } = require("./robotsController");

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

describe("Given a getRobotById function,", () => {
  describe("When it receives a res object with an id=3 and a next function,", () => {
    test("Then it should invoke Robot.findById(3).", async () => {
      Robot.find = jest.fn().mockResolvedValue({});
      const id = 3;
      const req = {
        params: { id },
      };
      const res = {
        json: jest.fn(),
      };
      const next = () => {};

      await getRobotById(req, res, next);

      expect(Robot.findById).toHaveBeenCalledWith(id);
    });
  });

  describe("And Pet.findBy Id rejects,", () => {
    test("Then it should invoke next function with the error rejected.", async () => {
      const error = {};
      Robot.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });

  describe("And Pet.finById resolves with an object with the property name = 'Mazinger Z',", () => {
    test("Then it should invoke the res.json function with this object.", async () => {
      const id = 1;
      const robot = {
        id: 1,
        name: "Mazinger Z",
        image: "imageMazingerZ",
        speed: "20",
        stamina: "75",
        creation_date: "01-jan-2000",
        token: "czj8p47m27",
      };
      const req = {
        params: {
          id,
        },
      };
      const next = () => {};
      const res = {
        json: jest.fn(),
      };
      Robot.findById = jest.fn().mockResolvedValue(robot);

      await getRobotById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(robot);
    });
  });
});

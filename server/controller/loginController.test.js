require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");
const login = require("./loginController");

jest.mock("../../database/models/User");
jest.mock("bcrypt");

describe("Given a login function,", () => {
  describe("When it receives a request with a username and password, and the username doesn't exist in the database,", () => {
    test("Then it should return an error with a message 'A: Credenciales erroneas ʅ(°,ʖ°)ʃ'", async () => {
      const testedUser = {
        username: "juan",
        password: "arimatea",
      };
      const req = {
        body: {
          username: "jose",
          password: "arimatea",
        },
      };
      const res = {};
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(testedUser);
      const expectedMessage = "A: Credenciales erroneas ʅ(°,ʖ°)ʃ";
      const expectedCode = 401;

      await login(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedCode);
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedMessage);
    });
  });

  describe("When it receives a request with a username and password, and the password doesn't exist in the database,", () => {
    test("Then it should return an error with a message 'B: Credenciales erroneas ʅ(°,ʖ°)ʃ'", async () => {
      const testedUser = {
        username: "jose",
        password: "arimatea",
      };
      const req = {
        body: {
          username: "jose",
          password: "deArimatea",
        },
      };
      const res = {};
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(testedUser);
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const expectedMessage = "B: Credenciales erroneas ʅ(°,ʖ°)ʃ";
      const expectedCode = 401;

      await login(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedCode);
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedMessage);
    });
  });

  describe("When it receives a correct username and password,", () => {
    test("Then i should invoke res.json", async () => {
      const testedUser = {
        id: 2,
        username: "jose",
        password: "arimatea",
      };
      const req = {
        body: {
          username: "jose",
          password: "arimatea",
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = () => {};
      User.findOne = jest.fn().mockResolvedValue(testedUser);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const expectedToken = "whatever";
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      await login(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
  });
});

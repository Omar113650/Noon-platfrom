import request from "supertest";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import * as authService from "../services/AuthServices";
import {
  Register,
  verifyAccount,
  Signin,
  logout,
  sendResetPasswordLink,
  validateResetPasswordLink,
  resetPassword,
} from "../Controllers/AuthController";

jest.mock("../utils/logger", () => ({
  info: jest.fn(),
}));

jest.mock("../services/AuthServices");

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

app.post("/api/auth/register", Register);
app.post("/api/auth/verify-account", verifyAccount);
app.post("/api/auth/signin", Signin);
app.post("/api/auth/logout", logout);
app.post("/api/auth/send-reset-password-link", sendResetPasswordLink);
app.get("/api/auth/reset-password/:userId/:token", validateResetPasswordLink);
app.post("/api/auth/reset-password/:userId/:token", resetPassword);

describe("AuthController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Register", () => {
    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/api/auth/register").send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("All fields are required");
    });

    it("should return 400 if passwords do not match", async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "user@test.com",
        phone: "0100000000",
        date: "2025-08-09",
        type: "user",
        password: "123456",
        ConfirmPassword: "654321",
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Password and ConfirmPassword do not match"
      );
    });

    it("should register user successfully", async () => {
      (authService.registerUser as jest.Mock).mockResolvedValue({
        newUser: {
          id: 1,
          email: "user@test.com",
          phone: "0100000000",
          date: "2025-08-09",
          type: "user",
        },
        token: "fake.jwt.token",
      });

      const res = await request(app).post("/api/auth/register").send({
        email: "user@test.com",
        phone: "0100000000",
        date: "2025-08-09",
        type: "user",
        password: "123456",
        ConfirmPassword: "123456",
      });

      expect(res.status).toBe(201);
      expect(res.body.message).toContain("Registration successful");
      expect(res.body.user.email).toBe("user@test.com");
    });
  });

  describe("Signin", () => {
    it("should return 400 if email or password is missing", async () => {
      const res = await request(app).post("/api/auth/signin").send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Email and password are required");
    });

    it("should signin successfully", async () => {
      (authService.signinUser as jest.Mock).mockResolvedValue({
        user: {
          id: 1,
          email: "user@test.com",
          phone: "0100000000",
          date: "2025-08-09",
          type: "user",
        },
        accesstoken: "access.token",
        refreshtoken: "refresh.token",
      });

      const res = await request(app).post("/api/auth/signin").send({
        email: "user@test.com",
        password: "123456",
      });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Signin successful");
      expect(res.body.user.email).toBe("user@test.com");
      expect(res.body.accesstoken).toBe("access.token");
    });
  });

  describe("Logout", () => {
    it("should clear cookie and logout", async () => {
      const res = await request(app).post("/api/auth/logout").send();
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("User logged out successfully");
    });
  });

  describe("Password reset flow", () => {
    it("should send reset password link", async () => {
      (authService.sendPasswordResetLink as jest.Mock).mockResolvedValue(true);
      const res = await request(app)
        .post("/api/auth/send-reset-password-link")
        .send({ email: "user@test.com" });
      expect(res.status).toBe(200);
      expect(res.body.message).toContain("Password reset link");
    });

    it("should validate reset password link", async () => {
      (authService.validateResetLink as jest.Mock).mockResolvedValue(true);
      const res = await request(app).get(
        "/api/auth/reset-password/1/fakeToken"
      );
      expect(res.status).toBe(200);
      expect(res.body.message).toContain("Valid link");
    });

    it("should reset password successfully", async () => {
      (authService.resetUserPassword as jest.Mock).mockResolvedValue(true);
      const res = await request(app)
        .post("/api/auth/reset-password/1/fakeToken")
        .send({ password: "newPass123" });
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Password has been changed successfully");
    });
  });
});
